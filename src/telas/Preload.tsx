/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthProvider';
import {UserContext} from '../context/UserProvider';

export default function Preload({navigation}: any) {
  const {setUserAuth, recuperaCredencialdaCache, signIn} =
    useContext<any>(AuthContext);
  const {getUser} = useContext<any>(UserContext);

  //ao montar o componente cria um listener para a autenticação do Firebase
  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(async authUser => {
      console.log('Preload');
      console.log(authUser);
      //se há um usuário autenticado
      if (authUser) {
        //1o. Verifica se o email foi verificado
        if (authUser.emailVerified) {
          //2o. Se o email foi verificado, busca os detalhes do usuário no Firestore e os em uma state do armazena no contexto AuthProvider
          await buscaUsuario();
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
        }
      } else {
        logar(); //se não, tenta logar com as credenciais armazenadas
      }
    });
    return () => {
      unsubscriber(); //unsubscribe o listener ao desmontar
    };
  }, []);

  async function logar() {
    const credencial = await recuperaCredencialdaCache();
    if (credencial !== 'null') {
      //se tem credenciais armazenadas tenta logar
      const mensagem = await signIn(credencial);
      if (mensagem === 'ok') {
        await buscaUsuario();
      } else {
        //se não consegue logar vai para a tela de login
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
      }
    }
  }

  async function buscaUsuario() {
    const usuario = await getUser();
    const credencial = await recuperaCredencialdaCache();
    if (usuario) {
      usuario.senha = credencial?.senha;
      console.log(usuario);
      setUserAuth(usuario);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require('../assets/images/logo512.png')}
        accessibilityLabel="logo do app"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 250,
    height: 250,
  },
});
