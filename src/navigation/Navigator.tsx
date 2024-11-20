/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import Aluno from '../telas/Aluno';
import Alunos from '../telas/Alunos';
import Menu from '../telas/Menu';
import Perfil from '../telas/PerfilTela';
import Preload from '../telas/Preload';
import RecuperarSenha from '../telas/RecuperarSenha';
import SignIn from '../telas/SignIn';
import SignUp from '../telas/SignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={RecuperarSenha} name="RecuperarSenha" />
  </Stack.Navigator>
);

const AppStack = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Alunos"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Alunos}
        name="Alunos"
        options={{
          tabBarLabel: 'Alunos',
          tabBarIcon: () => (
            <Icon
              source="account-group"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => (
            <Icon source="menu" color={theme.colors.primary} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen
          component={Aluno}
          name="Aluno"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen component={Perfil} name="Perfil" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
