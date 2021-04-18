import React from 'react';

import CardStacks from './card-stacks';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashCard from './flash-card';
import WordDecks from './word-decks';

const Stack = createStackNavigator();

function MainNavContainer(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WordDecks">
        <Stack.Screen name="WordDecks" component={WordDecks} />
        <Stack.Screen name="CardStacks" component={CardStacks} />
        <Stack.Screen name="FlashCards" component={FlashCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavContainer;
