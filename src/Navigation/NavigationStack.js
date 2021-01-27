import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  SplashScreen from '../Screens/SplashScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import Home from '../Components/Home';

const Stack = createStackNavigator();

const NavigationStack = () => {

    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions = {{headerShown : false}}>
            <Stack.Screen name = "SplashScreen" component = { SplashScreen } />
            <Stack.Screen name = "SignIn" component = { SignInScreen} />
            <Stack.Screen name = "Home" component = { Home } />
            <Stack.Screen name = "SignUp" component = { SignUpScreen } />
            <Stack.Screen name = "ForgotPassword" component = { ForgotPasswordScreen } />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationStack 