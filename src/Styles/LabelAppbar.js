import { StyleSheet } from 'react-native';

const LabelAppBarStyle = StyleSheet.create({
    textinput_style : { 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
    },

    textinput_error_style : {
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
        paddingBottom : 0,
    },

    text_style : {
        color : 'black',
        fontSize : 17,
        paddingLeft : 20
    },

    text_error_style : {
        fontSize : 12, 
        color : 'red', 
        paddingLeft : 20
    }
})

export default LabelAppBarStyle