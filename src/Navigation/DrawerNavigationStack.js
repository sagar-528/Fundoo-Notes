import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
import Reminder from '../Components/Dashboard/Reminder'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack({props}) {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props}/> }>
            <Drawer.Screen name = 'Notes' component = {NoteScreen} />
            <Drawer.Screen name = 'Reminder' component = {Reminder} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
