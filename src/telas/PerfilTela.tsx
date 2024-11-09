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
    senha: yup
      .string()
      .required(requiredMessage)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres',
      ),
    confirmar_senha: yup
      .string()
      .required(requiredMessage)
      .equals([yup.ref('senha')], 'As senhas não conferem'),
  })
  .required();

export default function PerfilTela({navigation}: any) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmar_senha: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [exibirSenha, setExibirSenha] = useState(true);
  const [requisitando, setRequisitando] = useState(false);
  const [dialogErroVisivel, setDialogErroVisivel] = useState(false);
  const [dialogExcluirVisivel, setDialogExcluirVisivel] = useState(false);
  const [mensagem, setMensagem] = useState({tipo: '', mensagem: ''});
  const {userAuth} = useContext<any>(AuthContext);
  const {update, del} = useContext<any>(UserContext);

  //TODO: verificar se o usuário está logado e pegar o uid dele
  useEffect(() => {
    register('nome');
    register('email');
    register('senha');
    register('confirmar_senha');
  }, [register]);

  async function onSubmit(data: Usuario) {
    console.log('Atualizar perfil');
    setRequisitando(true);
    const msg = await update(data);
    if (msg === 'ok') {
      setMensagem({
        tipo: 'ok',
        mensagem:
          'Show! Seu perfil foi atualizado com sucesso. Verifique seu email para validar sua conta.',
      });
      setDialogErroVisivel(true);
      setRequisitando(false);
    } else {
      setMensagem({tipo: 'erro', mensagem: msg});
      setDialogErroVisivel(true);
      setRequisitando(false);
    }
  }

  async function excluirConta(data: Usuario) {
    console.log('Excluir conta');
    setDialogExcluirVisivel(true); //TODO: ver pq não está abrindo o dialog
    setRequisitando(true);
    //const msg = await del(data.uid);
    if ('ok' === 'ok') {
      setRequisitando(false);
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
                label="Senha"
                placeholder="Digite sua senha"
                mode="outlined"
                autoCapitalize="none"
                returnKeyType="next"
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
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                mode="outlined"
                autoCapitalize="none"
                returnKeyType="go"
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
            name="confirmar_senha"
          />
          {errors.confirmar_senha && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.confirmar_senha?.message?.toString()}
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
            onPress={handleSubmit(excluirConta)}
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
          <Button onPress={() => setDialogExcluirVisivel(false)}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
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
