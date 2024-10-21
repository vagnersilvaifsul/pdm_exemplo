import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

export default function SignIn({navigation}: any) {
  return (
    <View>
      <Text>Sign In</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Home')}>
        <Text>Ir para Home</Text>
      </TouchableHighlight>
    </View>
  );
}
