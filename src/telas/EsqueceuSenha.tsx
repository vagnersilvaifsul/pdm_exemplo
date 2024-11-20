import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import * as yup from 'yup';

const requiredMessage = 'Campo obrigatório';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(requiredMessage)
    .matches(/\S+@\S+\.\S+/, 'Email inválido'),
});

export default function EsqueceuSenha() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [requisitando, setRequisitando] = useState(false);

  function onSubmit(data: any) {
    setRequisitando(true);
    console.log(data);
    setRequisitando(false);
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Recuperar Senha</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textinput}
            label="Email"
            placeholder="Digite seu email cadastrado"
            mode="outlined"
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
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
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={requisitando}
        disabled={requisitando}>
        {!requisitando ? 'Enviar' : 'Enviando'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  textinput: {
    width: 350,
    height: 50,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  textError: {
    width: 350,
  },
  button: {
    marginTop: 50,
    marginBottom: 30,
    width: 350,
  },
});
