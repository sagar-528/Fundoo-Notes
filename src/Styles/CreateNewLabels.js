import { StyleSheet } from 'react-native';

const CreateNewLabelStyle = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },

    header_style : {
        backgroundColor : 'transparent'
    },

    create_label_appbar : {
        borderTopWidth : 0.7,
        borderBottomWidth : 0.7, 
        borderColor : 'grey',
    },

    textinput_style : { 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        color : 'black'
    },

    textinput_error_style : {
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        paddingBottom : 0,
    },

    text_style : {
        color : 'grey',
        fontSize : 17,
        paddingLeft : 20
    },

    text_error_style : {
        fontSize : 12, 
        color : 'red', 
        paddingLeft : 20
    }
})

export default CreateNewLabelStyle