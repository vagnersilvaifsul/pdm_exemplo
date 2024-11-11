import {yupResolver} from '@hookform/resolvers/yup';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {AuthContext} from '../context/AuthProvider';
import {UserContext} from '../context/UserProvider';
import {Usuario} from '../model/Usuario';

const requiredMessage = 'Campo obrigatório';

const schema = yup
  .object()
  .shape({
    nome: yup
      .string()
      .required(requiredMessage)
      .min(2, 'O nome deve ter ao menos 2 caracteres'),
    email: yup
      .string()
      .required(requiredMessage)
      .matches(/\S+@\S+\.\S+/, 'Email inválido'),
    curso: yup.string().required(requiredMessage),
    perfil: yup.string().required(requiredMessage),
  })
  .required();

export default function PerfilTela({navigation}: any) {
  const {userAuth} = useContext<any>(AuthContext);
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: userAuth.nome,
      email: userAuth.email,
      curso: userAuth.curso,
      perfil: userAuth.perfil,
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [requisitando, setRequisitando] = useState(false);
  const [dialogErroVisivel, setDialogErroVisivel] = useState(false);
  const [dialogExcluirVisivel, setDialogExcluirVisivel] = useState(false);
  const [mensagem, setMensagem] = useState({tipo: '', mensagem: ''});
  const {update, del} = useContext<any>(UserContext);

  useEffect(() => {
    register('nome');
    register('email');
    register('curso');
    register('perfil');
  }, [register]);

  async function onSubmit(data: Usuario) {
    console.log('Atualizar perfil');
    setRequisitando(true);
    data.urlFoto =
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    const msg = await update(data);
    if (msg === 'ok') {
      setMensagem({
        tipo: 'ok',
        mensagem: 'Show! Seu perfil foi atualizado com sucesso.',
      });
      setDialogErroVisivel(true);
      setRequisitando(false);
    } else {
      setMensagem({tipo: 'erro', mensagem: msg});
      setDialogErroVisivel(true);
      setRequisitando(false);
    }
  }

  function avisarDaExclusaoPermanenteDaConta() {
    setDialogExcluirVisivel(true);
  }

  async function excluirConta() {
    setDialogExcluirVisivel(false);
    setRequisitando(true);
    const msg = await del(userAuth.uid);
    if (msg === 'ok') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      setMensagem({tipo: 'erro', mensagem: 'ops! algo deu errado'});
      setDialogErroVisivel(true);
      setRequisitando(false);
    }
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
          <View style={styles.divButtonsImage}>
            <Button
              style={styles.buttonImage}
              mode="outlined"
              icon="image"
              onPress={() =>
                Alert.alert('Vamos ver isso em upload de imagens')
              }>
              Galeria
            </Button>
            <Button
              style={styles.buttonImage}
              mode="outlined"
              icon="camera"
              onPress={() =>
                Alert.alert('Vamos ver isso em upload de imagens')
              }>
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
                disabled
                label="Email"
                placeholder="Digite seu email"
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

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                disabled
                label="Curso ou Empresa"
                placeholder="Clique para selecionar outro curso"
                mode="outlined"
                autoCapitalize="none"
                returnKeyType="next"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="domain" />}
              />
            )}
            name="curso"
          />
          {errors.curso && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.senha?.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                disabled
                label="Perfil"
                placeholder="Clique para selecionar outro perfil"
                mode="outlined"
                autoCapitalize="none"
                returnKeyType="go"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="account-eye" />}
              />
            )}
            name="perfil"
          />
          {errors.perfil && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.perfil?.message?.toString()}
            </Text>
          )}
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={requisitando}
            disabled={requisitando}>
            {!requisitando ? 'Atualizar' : 'Atualizando'}
          </Button>
          <Button
            style={styles.buttonOthers}
            mode="outlined"
            onPress={handleSubmit(avisarDaExclusaoPermanenteDaConta)}
            loading={requisitando}
            disabled={requisitando}>
            {!requisitando ? 'Excluir' : 'Excluindo'}
          </Button>
        </>
      </ScrollView>
      <Dialog
        visible={dialogExcluirVisivel}
        onDismiss={() => {
          setDialogErroVisivel(false);
        }}>
        <Dialog.Icon icon={'alert-circle-outline'} size={60} />
        <Dialog.Title style={styles.textDialog}>{'Ops!'}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {
              'Você tem certeza que deseja excluir sua conta?\nEsta operação será irreversível.'
            }
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogExcluirVisivel(false)}>
            Cancelar
          </Button>
          <Button onPress={excluirConta}>Excluir</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={dialogErroVisivel}
        onDismiss={() => {
          setDialogErroVisivel(false);
          if (mensagem.tipo === 'ok') {
            navigation.goBack();
          }
        }}>
        <Dialog.Icon
          icon={
            mensagem.tipo === 'ok'
              ? 'checkbox-marked-circle-outline'
              : 'alert-circle-outline'
          }
          size={60}
        />
        <Dialog.Title style={styles.textDialog}>
          {mensagem.tipo === 'ok' ? 'Informação' : 'Erro'}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {mensagem.mensagem}
          </Text>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
}

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
    marginTop: 50,
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
  textError: {
    width: 350,
  },
  button: {
    marginTop: 40,
  },
  buttonOthers: {
    marginTop: 20,
    marginBottom: 30,
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
  textDialog: {
    textAlign: 'center',
  },
});
