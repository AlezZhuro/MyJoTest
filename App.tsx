import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CardsScreen} from './CardsScreen';
import {StartScreen} from './StartScreen';

const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Start" component={StartScreen} />
        <RootStack.Screen name="CardsList" component={CardsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
