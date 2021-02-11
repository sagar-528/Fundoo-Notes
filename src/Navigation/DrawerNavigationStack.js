import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
import AddNote from '../Components/Dashboard/AddNotes'
import DeletedScreen from '../Components/Dashboard/DeletedScreen'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack() {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent navigation = {props}/> }>
            <Drawer.Screen name = 'Notes' component = { NoteScreen } />
            <Drawer.Screen name = 'Deleted' component = { DeletedScreen } />
            <Drawer.Screen name = 'AddNote' component = { AddNote } />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
