import { StyleSheet } from 'react-native'

const SearchNoteScreenStyle = StyleSheet.create({

    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },

    header_style : {
        backgroundColor : 'transparent',
    },

    appbar_container_style : {
        marginBottom : 10, 
        borderBottomWidth : 1, 
        borderColor : 'grey',
    },

    textinput_style : {
        width : '65%', 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17,
    },

    list_item_style : {
        borderWidth : 1, 
        marginLeft : '3%', 
        marginRight : '3%', 
        marginBottom : 10, 
        borderRadius : 10, 
        borderColor : "#bdbdbd",
        width : '94%',
    },

    list_title_style : { 
        marginBottom : 5,
        fontSize : 18,
    },

    list_title_note_empty_style : {
        marginBottom : -20,
        fontSize : 18,
    },

    list_note_style : {
        marginBottom : 5
    },

    list_note_title_empty_style : {
        marginTop : -25
    }

})

export default  SearchNoteScreenStyle