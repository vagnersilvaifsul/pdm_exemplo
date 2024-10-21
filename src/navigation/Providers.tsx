import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
}
