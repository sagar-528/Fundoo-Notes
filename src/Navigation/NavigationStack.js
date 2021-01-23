import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import  SplashScreen from '../Components/SplashScreen'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import ForgetPassword from '../Components/ForgotPassword'
import Home from '../Components/Home'

const Stack = createStackNavigator();

const NavigationStack = () => {

    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "SplashScreen" component = { SplashScreen } />
            <Stack.Screen name = "SignIn" component = {SignIn} />
            <Stack.Screen name = "Home" component = { Home } />
            <Stack.Screen name = "SignUp" component = { SignUp } />
            <Stack.Screen name = "ForgetPassword" component = { ForgetPassword } />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationStack 