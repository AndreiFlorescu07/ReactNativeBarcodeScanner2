import React, { useEffect } from 'react';

import Scanner from './screens/Scanner';
import Home from './screens/Home';
import AddProduct from './screens/AddProduct'; // Verificați că numele componentei importate este corect

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createTable } from './screens/dbConnection';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    createTable()
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
