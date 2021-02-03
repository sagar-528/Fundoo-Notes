import React, { Component } from 'react'
import {View, Text} from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export class DrawerContent extends Component {
    render() {
        return (
            <View>
              <DrawerContentScrollView>
                <Text>Fundoo Notes</Text>
                <Drawer.Section>
                  <Drawer.Item
                    icon = 'lightbulb-outline'
                    label = "Notes"
                  />
                  <Drawer.Item
                    icon = 'bell-outline'
                    label = "Reminders"
                  />
                </Drawer.Section>

                <Drawer.Section>
                  <Drawer.Item
                    icon = 'plus'
                    label = "Create New Label"
                  />
                </Drawer.Section>

                <Drawer.Section>
                  <Drawer.Item
                    icon = 'archive-arrow-down-outline'
                    label = "Archieve"
                  />

                  <Drawer.Item
                    icon = 'delete'
                    label = "Deleted"
                  />
                </Drawer.Section>

                <Drawer.Section>
                  <Drawer.Item
                    icon = 'cog-outline'
                    label = "Setting"
                  />

                  <Drawer.Item
                    icon = 'help'
                    label = "Help & feedback"
                  />
                </Drawer.Section>
              </DrawerContentScrollView> 
            </View> 
        )
    }
}

export default DrawerContent
