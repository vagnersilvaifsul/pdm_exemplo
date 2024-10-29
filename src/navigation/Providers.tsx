import React from 'react';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import Navigator from './Navigator';

//Ampliando o tema padrão
const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    backgroundPage: '#f0f0f7',
  },
};

export default function Providers() {
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
}
