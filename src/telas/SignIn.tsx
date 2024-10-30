import React, {useEffect, useState} from 'react';
import {useController, useForm} from 'react-hook-form';
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

function Input({
  name,
  control,
  label,
  placeholder,
  secureTextEntry,
  right,
}: any) {
  const {field} = useController({control, defaultValue: '', name});
  return (
    <TextInput
      style={styles.textinput}
      mode="outlined"
      autoCapitalize="none"
      label={label}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      right={right}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
}

function SignIn({navigation, theme}: any) {
  const {control, handleSubmit} = useForm<Credencial>();
  const [enableText, setEnableText] = useState(true);

  useEffect(() => {
    console.log('redenrizou');
  }, []);

  function onSubmit(data: Credencial) {
    console.log(JSON.stringify(data));
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
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Digite seu email"
            secureTextEntry={false}
            right={<TextInput.Icon icon="email" />}
          />
          <Input
            name="senha"
            control={control}
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={enableText}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setEnableText(previus => !previus)}
              />
            }
          />
          <Text
            style={{...styles.textEsqueceuSenha, color: theme.colors.tertiary}}
            variant="labelMedium"
            onPress={() =>
              Alert.alert('Todo', 'ir para a tela esqueceu senha')
            }>
            Esqueceu sua senha?
          </Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
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
