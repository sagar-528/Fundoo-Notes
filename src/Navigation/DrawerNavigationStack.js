import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NoteScreen from '../Components/Dashboard/NoteScreen'
import DrawerContent from '../Components/Dashboard/DrawerContent'
import DeletedScreen from '../Components/Dashboard/DeletedScreen'
import SearchNoteScreen from '../Components/Dashboard/SearchNoteScreen'
import LabelNoteScreen from '../Components/Dashboard/LabelNoteScreen'
import ArchiveNoteScreen from '../Components/Dashboard/ArchiveNoteScreen'
import Reminder from '../Components/Dashboard/Reminder'

const Drawer = createDrawerNavigator();

function DrawerNavigationStack() {
    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent navigation = {props}/> }>
            <Drawer.Screen name = 'Notes' component = { NoteScreen } />
            <Drawer.Screen name = 'Deleted' component = { DeletedScreen } />
            <Drawer.Screen name = 'SearchNote' component = { SearchNoteScreen } />  
            <Drawer.Screen name = 'labelNote' component = { LabelNoteScreen } />  
            <Drawer.Screen name = 'archiveNote' component = { ArchiveNoteScreen } />
            <Drawer.Screen name = 'reminderNote' component = { Reminder } />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationStack
