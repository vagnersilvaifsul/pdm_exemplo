/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import React, {createContext, useEffect, useState} from 'react';
import {Credencial} from '../model/types';
import {Usuario} from '../model/Usuario';

//1. Cria o contexto
export const AuthContext = createContext({});

//2. Cria o provedor do contexto e exporta states e funções
export const AuthProvider = ({children}: any) => {
  const [userAuth, setUserAuth] = useState({
    authUser: auth().currentUser,
  });
  //ao montar o componente cria um listener para a autenticação do Firebase
  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      setUserAuth({...userAuth, authUser});
    });
    return () => {
      unsubscriber(); //unsubscribe o listener ao desmontar
    };
  }, []);

  /*
    Funções do processo de Autenticação
  */
  async function signUp(usuario: Usuario) {
    console.log('================= AuthProvider ===================');
    console.log(usuario);
    console.log('====================================');
    try {
      await auth().createUserWithEmailAndPassword(usuario.email, usuario.senha);
      console.log(auth().currentUser);
      await auth().currentUser?.sendEmailVerification();
      //await firestore().collection('users').doc(auth().currentUser.uid).set(localUser);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signIn(credencial: Credencial) {
    try {
      if (!auth().currentUser?.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await auth().signInWithEmailAndPassword(
        credencial.email,
        credencial.senha,
      );
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  //função utilitária
  function launchServerMessageErro(e: any) {
    console.log(e);
    switch (e.code) {
      case 'auth/invalid-credential':
        return 'Email inexistente ou senha errada.';
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inexistente.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthContext.Provider value={{userAuth, signUp, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};
