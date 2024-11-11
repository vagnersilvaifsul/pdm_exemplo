import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {createContext, useContext} from 'react';
import {Usuario} from '../model/Usuario';
import {AuthContext} from './AuthProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}: any) => {
  const {signOut, setUserAuth} = useContext<any>(AuthContext);

  async function update(usuario: Usuario): Promise<string> {
    try {
      //TODO: vai utilizar quando for salvar a imagem no storage
      // if (urlDevice !== '') {
      //   user.urlFoto = await sendImageToStorage(urlDevice, usuario);
      //   if (!usuario.urlFoto) {
      //     return 'Erro ao atualizar o usuário. Contate o suporte.'; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
      //   }
      // }
      const usuarioFirestore = {
        curso: usuario.curso,
        email: usuario.email,
        nome: usuario.nome,
        perfil: usuario.perfil,
        urlFoto: usuario.urlFoto,
      };
      await firestore()
        .collection('usuarios')
        .doc(auth().currentUser?.uid)
        .set(usuarioFirestore, {merge: true});
      const usuarioAtualizado = await getUser();
      setUserAuth(usuarioAtualizado);
      return 'ok';
    } catch (e) {
      console.error(e);
      return 'Erro ao atualizar o usuário. Contate o suporte.';
    }
  }

  async function del(uid: string): Promise<string> {
    try {
      await firestore().collection('usuarios').doc(uid).delete();
      await auth().currentUser?.delete();
      //await signOut(); //chama o signOut do AuthProvider para limpar a cache
      return 'ok';
    } catch (e) {
      console.error(e);
      return 'Erro ao excluir a conta. Contate o suporte.';
    }
  }

  //busca os detalhes do usuário
  async function getUser() {
    try {
      let doc = await firestore()
        .collection('usuarios')
        .doc(auth().currentUser?.uid)
        .get();
      if (doc.exists) {
        //console.log('Document data:', doc.data());
        const userData = doc.data();
        if (userData) {
          userData.uid = auth().currentUser?.uid;
          return userData;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  return (
    <UserContext.Provider value={{update, del, getUser}}>
      {children}
    </UserContext.Provider>
  );
};
