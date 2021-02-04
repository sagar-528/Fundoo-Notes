import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
// import Remainder from '../Components/Dashboard/Remainder'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack({props}) {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props}/> }>
            <Drawer.Screen name = 'Notes' component = {NoteScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
