import ImageResizer from '@bam.tech/react-native-image-resizer';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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

  const salvar = async (aluno: Aluno, urlDevice: string): Promise<string> => {
    try {
      if (urlDevice !== '') {
        aluno.urlFoto = await sendImageToStorage(aluno, urlDevice);
        if (!aluno.urlFoto) {
          return 'Não foi possíve salvar a imagem. Contate o suporte técnico.'; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
        }
      }
      await firestore().collection('alunos').doc(aluno.uid).set(
        {
          nome: aluno.nome,
          curso: aluno.curso,
          urlFoto: aluno.urlFoto,
        },
        {merge: true},
      );
      return 'ok';
    } catch (e) {
      console.error('AlunoProvider, salvar: ' + e);
      return 'Não foi possíve salvar a imagem. Contate o suporte técnico.';
    }
  };

  //urlDevice: qual imagem deve ser enviada via upload
  async function sendImageToStorage(
    aluno: Aluno,
    urlDevice: string,
  ): Promise<string> {
    //1. Redimensiona e compacta a imagem
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    //2. e prepara o path onde ela deve ser salva no storage
    const pathToStorage = `imagens/usuarios/${aluno.uid}/foto.png`;

    //3. Envia para o storage
    let url: string | null = ''; //local onde a imagem será salva no Storage
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapshot => {
      //Para acompanhar o upload, se necessário
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });

    //4. Busca a URL gerada pelo Storage
    await task.then(async () => {
      //se a task finalizar com sucesso, busca a url
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    //5. Pode dar zebra, então pega a exceção
    task.catch(e => {
      console.error('UserProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }

  return (
    <AlunoContext.Provider value={{alunos, salvar}}>
      {children}
    </AlunoContext.Provider>
  );
};
