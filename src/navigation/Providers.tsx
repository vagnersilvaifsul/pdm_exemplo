import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import Navigator from './Navigator';

//Ampliando o tema padrão
const themeLight = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    backgroundPage: '#f0f0f7',
  },
};

const themeDark = {
  ...MD3DarkTheme,
  // Especifica propriedades customizadas nos objetos aninhados
  colors: {
    ...MD3DarkTheme.colors,
    backgroundPage: '#000000',
  },
};

const temaDoApp = false;

export default function Providers() {
  return (
    <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
      <Navigator />
    </PaperProvider>
  );
}
