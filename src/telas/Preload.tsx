/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthProvider';

export default function Preload({navigation}: any) {
  const {setUserAuth, recuperaCredencialdaCache, signIn} =
    useContext<any>(AuthContext);

  //ao montar o componente cria um listener para a autenticação do Firebase
  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      console.log('Preload');
      console.log(authUser);
      if (authUser) {
        //se o usuário continua com a sessão no Firebase vai direto para a tela principal
        setUserAuth(authUser);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
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
    console.log('logar');
    console.log(credencial);
    if (credencial !== 'null') {
      //se tem credenciais armazenadas tenta logar
      const mensagem = await signIn(credencial);
      if (mensagem === 'ok') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
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
