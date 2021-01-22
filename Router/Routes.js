import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Components/HomePage'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import ForgetPassword from '../Components/ForgetPassword'

const Stack = createStackNavigator();

const Routes = () => {

    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "HomePage" component = {HomePage} />
            <Stack.Screen name = "SignIn" component = {SignIn} />
            <Stack.Screen name = "SignUp" component = {SignUp} />
            <Stack.Screen name = "ForgetPassword" component = {ForgetPassword} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes