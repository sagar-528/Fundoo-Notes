import React, { Component } from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawerContentStyle from '../../Styles/DrawerContent';
import * as Keychain from 'react-native-keychain'
import {storeUserID, storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import UserLabelServices from '../../../Service/UserLabelServices'
import SQLiteLabelServices from '../../../Service/SQLiteLabelServices'
import { connect } from 'react-redux'

class DrawerContent extends Component {

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

  handleCreateNewLabelButton = () => {
    this.props.navigation.navigation.closeDrawer();
    this.props.navigation.navigation.push('CreateLabel')
  }

  handleEditButton = () => {
    this.props.navigation.navigation.closeDrawer();
    this.props.navigation.navigation.push('CreateLabel')
  }

  render(){
    let labelId = Object.keys(this.props.userLabel);
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

              {
                (this.props.userLabel.length > 0) ? 
                <View style = {DrawerContentStyle.label_edit_style}>
                  <Text>LABELS</Text>
                  <TouchableWithoutFeedback
                    onPress = {this.handleEditButton}>
                    <Text style = {{marginLeft : 130}}>EDIT</Text>
                  </TouchableWithoutFeedback>
                </View>
                :
                null
              }
              {
                (this.props.userLabel.length > 0)
                ?    
                this.props.userLabel.map(labels => (
                    <React.Fragment key = {labels.label_id}>
                      <Drawer.Item
                        style = {DrawerContentStyle.drawer_item_style}
                        icon = 'label-outline'
                        label = {labels.label}
                        onPress = {() => this.props.navigation.navigation.push('Home', { screen : 'labelNote', params : {labels : labels}})}
                      />
                    </React.Fragment>
                  ))
                :
                null
              }

                <Drawer.Item
                  style = {DrawerContentStyle.drawer_item_style}
                  icon = 'plus'
                  label = "Create New Label"
                  onPress = {this.handleCreateNewLabelButton}
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

const mapStateToProps = state => {
  return {
      userId : state.createLabelReducer.userId,
      userLabel : state.createLabelReducer.userLabel
  }
}

export default connect(mapStateToProps)(DrawerContent)