import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import { Button } from 'react-native-paper'
import AddReminderStyle from '../../Styles/AddReminder'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default class AddReminder extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View>
                {this.props.reminder == '' ?
                    <Text style = {AddReminderStyle.text_style}>Add reminder</Text> 
                    :
                    <Text style = {AddReminderStyle.text_style}>Edit reminder</Text> 
                }
                <View style = {{marginTop : 10, marginBottom : 10}}>
                    <TouchableWithoutFeedback onPress={this.props.showDatepicker}>
                        <Text style = {AddReminderStyle.date_text_style}>{moment(this.props.date).format('D MMMM')}</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.showTimepicker}>
                        <View style = {{marginBottom : 5}}>
                            <Text style = {AddReminderStyle.time_text_style}>{moment(this.props.date).format('h.mm a')}</Text>
                            {this.props.errorDate ?
                                <Text style = {{color : 'red', fontSize : 14}}>Time Already Passed</Text>
                                :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    {this.props.show && (
                        <DateTimePicker
                            value={this.props.date}
                            mode={this.props.mode}
                            is24Hour={false}
                            display="default"
                            onChange={this.props.changeDate}
                            minimumDate={new Date()}
                        />
                    )}
                </View>
                <View style = {AddReminderStyle.button_container_style}>
                    {this.props.reminder != '' ?
                        <Button 
                            style = {{marginLeft : 20}}
                            onPress = {this.props.deleteReminder}
                            labelStyle = {{color  : 'black'}}>
                                Delete
                        </Button>
                        :
                        null
                    }
                    <Button 
                        style = {{marginLeft : 5}}
                        onPress = {this.props.dismissModal}
                        labelStyle = {{color  : 'black'}}>
                            Cancel
                    </Button>
                    <Button
                        style = {AddReminderStyle.save_button_style}
                        onPress = {this.props.saveReminder}
                        labelStyle = {{color  : 'black'}}
                        mode = 'contained'>
                            Save
                    </Button>
                </View>
            </View>
        )
    }
}