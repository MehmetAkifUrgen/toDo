import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/login';
import Sign from './src/auth/sign';
import auth from '@react-native-firebase/auth';
import Home from './src/pages/home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then(result =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`),
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error
const user = auth().currentUser;
function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  if (user == null) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="LoginPage"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignPage"
            component={Sign}
          />
          <Stack.Screen name="HomePage" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={Home} />
          <Stack.Screen
            options={{headerShown: false}}
            name="LoginPage"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignPage"
            component={Sign}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
