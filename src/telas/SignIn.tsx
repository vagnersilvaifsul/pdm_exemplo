import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Divider, Text, TextInput, withTheme} from 'react-native-paper';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('O email é obrigatório')
      .email('Digite um email válido'),
    senha: yup
      .string()
      .required('A senha é obrigatória')
      .min(8, 'A senha deve conter pelo menos 8 dígitos'),
  })
  .required();

type Credencial = {
  email: string;
  senha: string;
};

function SignIn({navigation, theme}: any) {
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      email: '',
      senha: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [exibirSenha, setExibirSenha] = useState(true);

  useEffect(() => {
    console.log('redenrizou');
  }, []);

  useEffect(() => {
    register('email');
    register('senha');
  }, [register]);

  function onSubmit(data: Credencial) {
    console.log(JSON.stringify(data));
    navigation.navigate('Home');
  }
  //console.log(errors);

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

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Email"
                placeholder="Digite seu email"
                mode="outlined"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.email?.message?.toString()}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Senha"
                placeholder="Digite sua senha"
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry={exibirSenha}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setExibirSenha(previus => !previus)}
                  />
                }
              />
            )}
            name="senha"
          />
          {errors.senha && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.senha?.message?.toString()}
            </Text>
          )}

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
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  textEsqueceuSenha: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  textCadastro: {},
  textError: {},
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
