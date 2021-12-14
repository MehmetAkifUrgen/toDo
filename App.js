import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/login';
import Sign from './src/auth/sign';
import auth from '@react-native-firebase/auth';
import Home from './src/pages/home';
const Stack = createNativeStackNavigator();

function App() {
  const user = auth().currentUser;
  if (user == null) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginPage" component={Login} />
          <Stack.Screen name="SignPage" component={Sign} />
          <Stack.Screen name="HomePage" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: 'TODO',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'tomato',
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 25,
              },
            }}
            name="HomePage"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
