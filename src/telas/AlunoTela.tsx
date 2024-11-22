import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, Dialog, Text, TextInput, useTheme} from 'react-native-paper';
import * as yup from 'yup';
import {AlunoContext} from '../context/AlunoProvider';
import {Aluno} from '../model/Aluno';

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

export default function AlunoTela({route, navigation}: any) {
  const [aluno, setAluno] = useState<Aluno | null>(route.params.aluno);
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: aluno?.nome,
      curso: aluno?.curso,
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [requisitando, setRequisitando] = useState(false);
  const [urlDevice, setUrlDevice] = useState<string | undefined>('');
  const [atualizando, setAtualizando] = useState(false);
  const [mensagem, setMensagem] = useState({tipo: '', mensagem: ''});
  const [dialogErroVisivel, setDialogErroVisivel] = useState(false);
  const [dialogExcluirVisivel, setDialogExcluirVisivel] = useState(false);
  const {salvar, excluir} = useContext<any>(AlunoContext);
  const [enable, setEnable] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    if (!aluno) {
      setEnable(true);
    }
  }, [aluno]);

  async function atualizar(data: Aluno) {
    data.uid = aluno?.uid || '';
    data.urlFoto =
      aluno?.urlFoto ||
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    setRequisitando(true);
    setAtualizando(true);
    const msg = await salvar(data, urlDevice);
    if (msg === 'ok') {
      setMensagem({
        tipo: 'ok',
        mensagem: 'Show! Operação realizada com sucesso.',
      });
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
    } else {
      setMensagem({tipo: 'erro', mensagem: msg});
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
    }
  }

  function avisarDaExclusaoPermanenteDaConta() {
    setDialogExcluirVisivel(true);
  }

  async function excluirAluno() {
    setDialogExcluirVisivel(false);
    setRequisitando(true);
    setExcluindo(true);
    const msg = await excluir(aluno);
    if (msg === 'ok') {
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
      setMensagem({
        tipo: 'ok',
        mensagem: 'O Aluno foi excluído com sucesso.',
      });
    } else {
      setMensagem({tipo: 'erro', mensagem: 'ops! algo deu errado'});
      setDialogErroVisivel(true);
      setRequisitando(false);
      setExcluindo(false);
    }
  }

  const buscaNaGaleria = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        setMensagem({tipo: 'erro', mensagem: 'Ops! Erro ao buscar a imagem.'});
      } else if (response.didCancel) {
        setMensagem({tipo: 'ok', mensagem: 'Ok, você cancelou.'});
      } else {
        const path = response.assets?.[0].uri;
        console.log('buscaNaGaleria');
        console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };

  function tiraFoto() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        setMensagem({tipo: 'erro', mensagem: 'Ops! Erro ao tirar a foto'});
      } else if (response.didCancel) {
        setMensagem({tipo: 'ok', mensagem: 'Ok, você cancelou.'});
      } else {
        const path = response.assets?.[0].uri;
        console.log('tiraFoto');
        console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          urlDevice !== ''
            ? {uri: urlDevice}
            : aluno && aluno?.urlFoto !== ''
            ? {uri: aluno?.urlFoto}
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
      {errors.nome && (
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
            editable={enable}
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
        {!atualizando ? 'Salvar' : 'Salvando'}
      </Button>
      <Button
        style={styles.buttonOthers}
        mode="outlined"
        onPress={handleSubmit(avisarDaExclusaoPermanenteDaConta)}
        loading={requisitando}
        disabled={requisitando}>
        {!excluindo ? 'Excluir' : 'Excluindo'}
      </Button>
      <Dialog
        visible={dialogExcluirVisivel}
        onDismiss={() => {
          setDialogErroVisivel(false);
          navigation.goBack();
        }}>
        <Dialog.Icon icon={'alert-circle-outline'} size={60} />
        <Dialog.Title style={styles.textDialog}>{'Ops!'}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {
              'Você tem certeza que deseja excluir esse registro?\nEsta operação será irreversível.'
            }
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogExcluirVisivel(false)}>
            Cancelar
          </Button>
          <Button onPress={excluirAluno}>Excluir</Button>
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
    marginTop: 40,
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
  textDialog: {
    textAlign: 'center',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  buttonOthers: {
    marginTop: 20,
    marginBottom: 30,
    width: 350,
  },
});
