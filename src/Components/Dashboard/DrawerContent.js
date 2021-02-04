import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const DrawerContent = ({props}) => {

  return (
            <View style = {{flex: 1}}>
              <DrawerContentScrollView {...props}>
              <Text style = {styles.app_name}>Fundoo Notes</Text>
              <Drawer.Section style = {styles.drawer_section_style}>
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'lightbulb-outline'
                  label = "Notes"
                />
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'bell-outline'
                  label = "Reminders"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {styles.drawer_section_style}>
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'plus'
                  label = "Create New Label"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {styles.drawer_section_style}>
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'archive-arrow-down-outline'
                  label = "Archieve"
                />
  
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'delete'
                  label = "Deleted"
                />
              </Drawer.Section>
  
              <Drawer.Section>
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'cog-outline'
                  label = "Setting"
                />
  
                <Drawer.Item
                  style = {styles.drawer_item_style}
                  icon = 'help'
                  label = "Help & feedback"
                />
              </Drawer.Section>
              </DrawerContentScrollView> 
            </View> 
        )
}

export default DrawerContent

const styles = StyleSheet.create({

  app_name : {
    fontSize : 25,
    fontWeight : 'bold',
    marginLeft : 20,
    marginTop : 10,
    marginBottom : 15
},

drawer_item_style : {
    paddingLeft : 10,
    height : 50,
    justifyContent : 'center',
    color : 'red'
},

drawer_section_style : {
    borderBottomWidth : 0.6,
    borderColor : 'grey'
}

})