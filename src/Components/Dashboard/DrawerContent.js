import React from 'react'
import {View, Text} from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import NoteCss from '../../Styles/NoteCss'

const DrawerContent = ({props}) => {

  return (
            <View style = {{flex: 1}}>
              <DrawerContentScrollView {...props}>
              <Text style = {NoteCss.app_name}>Fundoo Notes</Text>
              <Drawer.Section style = {NoteCss.drawer_section_style}>
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'lightbulb-outline'
                  label = "Notes"
                />
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'bell-outline'
                  label = "Reminders"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {NoteCss.drawer_section_style}>
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'plus'
                  label = "Create New Label"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {NoteCss.drawer_section_style}>
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'archive-arrow-down-outline'
                  label = "Archieve"
                />
  
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'delete'
                  label = "Deleted"
                />
              </Drawer.Section>
  
              <Drawer.Section>
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'cog-outline'
                  label = "Setting"
                />
  
                <Drawer.Item
                  style = {NoteCss.drawer_item_style}
                  icon = 'help'
                  label = "Help & feedback"
                />
              </Drawer.Section>
              </DrawerContentScrollView> 
            </View> 
        )
}

export default DrawerContent
