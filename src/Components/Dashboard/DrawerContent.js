import React, { Component } from 'react'
import {View, Text} from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawerContentStyle from '../../Styles/DrawerContent';

export default class DrawerContent extends Component {

  constructor(props) {
    super(props)
  }
  

  handleNoteIconButton = () => {
    const {onPress} = this.props
    this.props.navigation.navigation.push('Home', { screen : 'Notes'})
    // onPress();
  }

  handleDeletedIconButton = () => {
    const {onPress} = this.props
    this.props.navigation.navigation.push('Home', { screen : 'Deleted'})
    // onPress();
  }

  render(){
  return (
            <View style = {{flex: 1}}>
              <DrawerContentScrollView>
              <Text style = {DrawerContentStyle.app_name}>Fundoo Notes</Text>
              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'lightbulb-outline'
                  label = "Notes"
                  onPress = {this.handleNoteIconButton}
                />
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'bell-outline'
                  label = "Reminders"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'plus'
                  label = "Create New Label"
                />
              </Drawer.Section>
  
              <Drawer.Section style = {DrawerContentStyle.drawer_section_style}>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'archive-arrow-down-outline'
                  label = "Archieve"
                />
  
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'delete'
                  label = "Deleted"
                  onPress = {this.handleDeletedIconButton}
                />
              </Drawer.Section>
  
              <Drawer.Section>
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'cog-outline'
                  label = "Setting"
                />
  
                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'help'
                  label = "Help"
                />
              </Drawer.Section>
              </DrawerContentScrollView> 
            </View> 
        )}
}
