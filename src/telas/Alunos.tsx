/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, FAB, List, useTheme} from 'react-native-paper';
import {AlunoContext} from '../context/AlunoProvider';
import {Aluno} from '../model/Aluno';

export default function Alunos({navigation}: any) {
  const theme = useTheme();
  const {alunos} = useContext<any>(AlunoContext);

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
          {alunos.map((aluno: Aluno, key: number) => (
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => irParaTelaAluno(null)}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
