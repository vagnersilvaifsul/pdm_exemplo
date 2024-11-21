import firestore from '@react-native-firebase/firestore';
import React, {createContext, useEffect, useState} from 'react';
import {Aluno} from '../model/Aluno';

export const AlunoContext = createContext({});

export const AlunoProvider = ({children}: any) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const listener = firestore()
      .collection('alunos')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        //console.log(snapShot);
        //console.log(snapShot._docs);
        if (snapShot) {
          let data: Aluno[] = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              curso: doc.data().curso,
              urlFoto: doc.data().urlFoto,
            });
          });
          console.log('Lista de alunos vindas do Firebase');
          console.log(data);
          setAlunos(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  return (
    <AlunoContext.Provider value={{alunos}}>{children}</AlunoContext.Provider>
  );
};
