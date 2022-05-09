import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from '../screens/Home';
import Camera from '../screens/Camera';
import Result from '../screens/Result';

const Stack = createStackNavigator();

function Mainstack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Camera'
        component={Camera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Result' component={Result} />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Mainstack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
