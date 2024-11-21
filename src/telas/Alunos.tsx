/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, List, useTheme} from 'react-native-paper';

export default function Alunos({navigation}: any) {
  const theme = useTheme();
  //fake de dados para implementar a view
  const alunos = [
    {
      uid: '1',
      nome: 'João Dias Furtado',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '2',
      nome: 'Maria Helena Torres Santos',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '3',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '4',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '5',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '6',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '7',
      nome: 'João Dias Furtado',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '8',
      nome: 'Maria Helena Torres Santos',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '9',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '10',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '11',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '12',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '13',
      nome: 'João Dias Furtado',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '14',
      nome: 'Maria Helena Torres Santos',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '15',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '16',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '17',
      nome: 'João',
      curso: 'CSTSI',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
    {
      uid: '18',
      nome: 'Maria',
      curso: 'CSBD',
      urlFoto: 'https://www.gravatar.com/avatar/0?d=mp',
    },
  ];

  const irParaTelaAluno = (aluno: any) => {
    navigation.navigate('AlunoTela', {
      aluno,
    });
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <List.Section
        style={{...styles.list, backgroundColor: theme.colors.background}}>
        <List.Subheader style={styles.subhearder}>
          Lista de Alunos
        </List.Subheader>
        <ScrollView>
          {alunos.map((aluno, key) => (
            <Card
              key={key}
              style={{...styles.card, borderColor: theme.colors.secondary}}
              onPress={() => irParaTelaAluno(aluno)}>
              <Card.Title
                title={aluno.nome}
                subtitle={aluno.curso}
                left={() => (
                  <Avatar.Image size={40} source={{uri: aluno.urlFoto}} />
                )}
              />
            </Card>
          ))}
        </ScrollView>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subhearder: {
    fontSize: 20,
    alignSelf: 'center',
  },
  list: {
    width: '95%',
  },
  card: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    marginBottom: 10,
  },
});
