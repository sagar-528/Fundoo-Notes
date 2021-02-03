import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../Components/Dashboard/Home'
// import DrawerContent from '../Components/DrawerContent'

const Drawer = createDrawerNavigator();

const DrawerNavigationStack = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>}>
            <Drawer.Screen name = 'Notes' component = {Home} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigationStack
