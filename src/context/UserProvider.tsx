import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {createContext, useContext} from 'react';
import {Usuario} from '../model/Usuario';
import {AuthContext} from './AuthProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}: any) => {
  const {signOut} = useContext<any>(AuthContext);

  async function update(usuario: Usuario): Promise<string> {
    try {
      //TODO: vai utilizar quando for salvar a imagem no storage
      // if (urlDevice !== '') {
      //   user.urlFoto = await sendImageToStorage(urlDevice, user);
      //   if (!user.urlFoto) {
      //     return false; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
      //   }
      // }
      await firestore()
        .collection('usuarios')
        .doc(auth().currentUser?.uid)
        .set(usuario);
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
      await signOut(); //chama o signOut do AuthProvider para limpar a cache
      return 'ok';
    } catch (e) {
      console.error(e);
      return 'Erro ao excluir a conta. Contate o suporte.';
    }
  }

  return (
    <UserContext.Provider value={{update, del}}>
      {children}
    </UserContext.Provider>
  );
};
