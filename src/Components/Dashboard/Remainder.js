import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native-animatable'

class Remainder extends Comment {

    constructor(props) {
        super(props)
    }
    
    render(){
    return (
        <View>
            <Text> Remainder Component </Text>
        </View>
    )}
}

export default Remainder
