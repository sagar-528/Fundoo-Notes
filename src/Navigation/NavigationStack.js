import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  SplashScreen from '../Components/Screens/SplashScreen';
import SignInScreen from '../Components/Screens/SignInScreen';
import SignUpScreen from '../Components/Screens/SignUpScreen';
import ForgetPasswordScreen from '../Components/Screens/ForgotPasswordScreen';
import Home from '../Components/Home';

const Stack = createStackNavigator();

const NavigationStack = () => {

    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "SplashScreen" component = { SplashScreen } />
            <Stack.Screen name = "SignIn" component = { SignInScreen} />
            <Stack.Screen name = "Home" component = { Home } />
            <Stack.Screen name = "SignUp" component = { SignUpScreen } />
            <Stack.Screen name = "ForgetPassword" component = { ForgetPasswordScreen } />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationStack 