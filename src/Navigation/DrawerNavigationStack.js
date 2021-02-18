import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
import DeletedScreen from '../Components/Dashboard/DeletedScreen'
import SearchNoteScreen from '../Components/Dashboard/SearchNoteScreen'
import LabelNoteScreen from '../Components/Dashboard/LabelNoteScreen'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack() {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent navigation = {props}/> }>
            <Drawer.Screen name = 'Notes' component = { NoteScreen } />
            <Drawer.Screen name = 'Deleted' component = { DeletedScreen } />
            <Drawer.Screen name = 'SearchNote' component = { SearchNoteScreen } />  
            <Drawer.Screen name = 'labelNote' component = { LabelNoteScreen } />  
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
