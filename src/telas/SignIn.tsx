import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Divider, Text, TextInput, withTheme} from 'react-native-paper';

type Credencial = {
  email: string;
  senha: string;
};

function SignIn({navigation, theme}: any) {
  const [credencial, setCredencial] = useState<Credencial>({
    email: '',
    senha: '',
  });

  useEffect(() => {
    console.log('renderizou');
  });

  function onSubmit() {
    console.log(`email: ${credencial.email} e senha: ${credencial.senha}`);
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
      <ScrollView>
        <>
          <Image
            style={styles.image}
            source={require('../assets/images/logo512.png')}
          />
          <TextInput
            style={styles.textinput}
            value={credencial.email}
            onChangeText={t => setCredencial({...credencial, email: t})}
            autoCapitalize="none"
            mode="outlined"
            label="Email"
            placeholder="Digite seu email"
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            style={styles.textinput}
            value={credencial.senha}
            onChangeText={t => setCredencial({...credencial, senha: t})}
            autoCapitalize="none"
            mode="outlined"
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
          <Text
            style={{...styles.textEsqueceuSenha, color: theme.colors.tertiary}}
            variant="labelMedium"
            onPress={() =>
              Alert.alert('Todo', 'ir para a tela esqueceu senha')
            }>
            Esqueceu sua senha?
          </Text>
          <Button style={styles.button} mode="contained" onPress={onSubmit}>
            Entrar
          </Button>
          <Divider />
          <View style={styles.divCadastro}>
            <Text variant="labelMedium">Não tem uma conta?</Text>
            <Text
              style={{...styles.textCadastro, color: theme.colors.tertiary}}
              variant="labelMedium"
              onPress={() => Alert.alert('Todo', 'ir para a tela cadatre-se')}>
              {' '}
              Cadastre-se.
            </Text>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
}
export default withTheme(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 200 / 2,
    marginTop: 100,
    marginBottom: 40,
  },
  textinput: {
    width: 350,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  textEsqueceuSenha: {
    alignSelf: 'flex-end',
  },
  textCadastro: {},
  button: {
    marginTop: 50,
    marginBottom: 30,
  },
  divCadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
