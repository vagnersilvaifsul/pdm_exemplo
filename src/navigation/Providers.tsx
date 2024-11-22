import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {AlunoProvider} from '../context/AlunoProvider';
import {AuthProvider} from '../context/AuthProvider';
import {UserProvider} from '../context/UserProvider';
import Navigator from './Navigator';

//Ampliando o tema padrão
const themeLight = {
  ...MD3LightTheme,
  colors: {
    primary: '#E374E6',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: '#E374E6',
    onPrimaryContainer: 'rgb(44, 0, 81)',
    secondary: 'rgb(102, 90, 111)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(237, 221, 246)',
    onSecondaryContainer: 'rgb(33, 24, 42)',
    tertiary: '#A407E6',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 217, 221)',
    onTertiaryContainer: 'rgb(50, 16, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(29, 27, 30)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(29, 27, 30)',
    surfaceVariant: 'rgb(233, 223, 235)',
    onSurfaceVariant: 'rgb(74, 69, 78)',
    outline: 'rgb(124, 117, 126)',
    outlineVariant: 'rgb(204, 196, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 47, 51)',
    inverseOnSurface: 'rgb(245, 239, 244)',
    inversePrimary: 'rgb(220, 184, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)',
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    accent: '#A407E6',
    onAccent: 'rgb(255, 255, 255)',
    accentContainer: 'rgb(255, 220, 198)',
    onAccentContainer: 'rgb(49, 19, 0)',
    white: 'rgb(255, 255, 255)',
  },
};

const themeDark = {
  ...MD3DarkTheme,
  colors: {
    primary: 'rgb(220, 184, 255)',
    onPrimary: 'rgb(71, 12, 122)',
    primaryContainer: 'rgb(95, 43, 146)',
    onPrimaryContainer: 'rgb(240, 219, 255)',
    secondary: 'rgb(208, 193, 218)',
    onSecondary: 'rgb(54, 44, 63)',
    secondaryContainer: 'rgb(77, 67, 87)',
    onSecondaryContainer: 'rgb(237, 221, 246)',
    tertiary: 'rgb(243, 183, 190)',
    onTertiary: 'rgb(75, 37, 43)',
    tertiaryContainer: 'rgb(101, 58, 65)',
    onTertiaryContainer: 'rgb(255, 217, 221)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(29, 27, 30)',
    onBackground: 'rgb(231, 225, 229)',
    surface: 'rgb(29, 27, 30)',
    onSurface: 'rgb(231, 225, 229)',
    surfaceVariant: 'rgb(74, 69, 78)',
    onSurfaceVariant: 'rgb(204, 196, 206)',
    outline: 'rgb(150, 142, 152)',
    outlineVariant: 'rgb(74, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(231, 225, 229)',
    inverseOnSurface: 'rgb(50, 47, 51)',
    inversePrimary: 'rgb(120, 69, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(39, 35, 41)',
      level2: 'rgb(44, 40, 48)',
      level3: 'rgb(50, 44, 55)',
      level4: 'rgb(52, 46, 57)',
      level5: 'rgb(56, 49, 62)',
    },
    surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)',
    accent: 'rgb(255, 183, 134)',
    onAccent: 'rgb(80, 36, 0)',
    accentContainer: 'rgb(114, 54, 0)',
    onAccentContainer: 'rgb(255, 220, 198)',
  },
};

const temaDoApp = true; //TODO: passar para Context para mudar o tema do app

export default function Providers() {
  return (
    <AuthProvider>
      <UserProvider>
        <AlunoProvider>
          <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
            <Navigator />
          </PaperProvider>
        </AlunoProvider>
      </UserProvider>
    </AuthProvider>
  );
}
