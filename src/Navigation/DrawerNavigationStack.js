import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
import Reminder from '../Components/Dashboard/Reminder'
import AddNote from '../Components/Dashboard/AddNotes'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack({props}) {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent props = {props}/> }>
            <Drawer.Screen name = 'Notes' component = { NoteScreen } />
            <Drawer.Screen name = 'Reminder' component = { Reminder } />
            <Drawer.Screen name = 'AddNote' component = { AddNote } />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
