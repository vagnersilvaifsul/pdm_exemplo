import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function Aluno({route}: any) {
  console.log(route.params.aluno);

  return (
    <View style={styles.container}>
      <Text variant="labelMedium">Você está na tela Aluno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
