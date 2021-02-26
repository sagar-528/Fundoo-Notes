import { StyleSheet } from 'react-native';

const AddReminderStyle = StyleSheet.create({
    text_style : {
        fontSize : 17, 
        fontWeight : 'bold',
        marginLeft : 5,
        marginBottom : 10
    },

    button_container_style : {
        flexDirection : 'row', 
        justifyContent : 'flex-end',
        marginTop : 10
    },

    picker_container_style : {
        borderBottomWidth : 1, 
        borderColor : '#BEBEBE', 
        marginBottom : 10
    },

    date_text_style : {
        fontSize : 18, 
        marginBottom : 15, 
        borderBottomWidth : 0.7, 
        paddingBottom : 5,
        paddingLeft : 5,
        borderColor : 'grey'
    },

    time_text_style : {
        fontSize : 18,  
        borderBottomWidth : 0.7, 
        paddingBottom : 5,
        paddingLeft : 5,
        borderColor : 'grey'
    },

    save_button_style : {
        backgroundColor : '#f3bb01', 
        width : 90, 
        marginLeft : 15
    }
})

export default AddReminderStyle;