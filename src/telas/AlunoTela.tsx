import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import * as yup from 'yup';
import {Aluno} from '../model/Aluno';
import {Usuario} from '../model/Usuario';

const requiredMessage = 'Campo obrigatório';
const schema = yup.object().shape({
  nome: yup
    .string()
    .required(requiredMessage)
    .min(2, 'O nome deve ter ao menos 2 caracteres'),
  curso: yup
    .string()
    .required(requiredMessage)
    .min(4, 'O nome deve ter ao menos 2 caracteres'),
});

export default function AlunoTela({route}: any) {
  const [aluno, setAluno] = useState<Aluno>(route.params.aluno);
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: aluno.nome,
      curso: aluno.curso,
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [requisitando, setRequisitando] = useState(false);
  const [urlDevice, setUrlDevice] = useState<string | undefined>('');

  async function atualizar(data: Usuario) {
    console.log('Atualizar', data);
  }

  async function buscaNaGaleria() {
    console.log('Busca na galeria');
  }

  async function tiraFoto() {
    console.log('Tira foto');
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          urlDevice !== ''
            ? {uri: urlDevice}
            : aluno.urlFoto !== ''
            ? {uri: aluno.urlFoto}
            : require('../assets/images/person.png')
        }
        loadingIndicatorSource={require('../assets/images/person.png')}
      />
      <View style={styles.divButtonsImage}>
        <Button
          style={styles.buttonImage}
          mode="outlined"
          icon="image"
          onPress={() => buscaNaGaleria()}>
          Galeria
        </Button>
        <Button
          style={styles.buttonImage}
          mode="outlined"
          icon="camera"
          onPress={() => tiraFoto()}>
          Foto
        </Button>
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textinput}
            label="Nome"
            placeholder="Digite seu nome completo"
            mode="outlined"
            autoCapitalize="words"
            returnKeyType="next"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={<TextInput.Icon icon="smart-card" />}
          />
        )}
        name="nome"
      />
      {errors.email && (
        <Text style={{...styles.textError, color: theme.colors.error}}>
          {errors.nome?.message?.toString()}
        </Text>
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textinput}
            label="Curso"
            placeholder="Digite seu curso"
            mode="outlined"
            autoCapitalize="words"
            returnKeyType="next"
            keyboardType="default"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={false}
            right={<TextInput.Icon icon="domain" />}
          />
        )}
        name="curso"
      />
      {errors.curso && (
        <Text style={{...styles.textError, color: theme.colors.error}}>
          {errors.curso?.message?.toString()}
        </Text>
      )}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(atualizar)}
        loading={requisitando}
        disabled={requisitando}>
        {!requisitando ? 'Atualizar' : 'Atualizando'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 180 / 2,
    marginTop: 50,
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
  divButtonsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  buttonImage: {
    width: 180,
  },
});
