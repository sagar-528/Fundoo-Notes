import { StyleSheet } from 'react-native';

const LabelNoteScreenStyle = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },

    list_container : {
        flexDirection: 'row', 
        flexWrap: 'wrap'
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

    list_item_grid_style : {
        borderWidth : 1, 
        marginLeft : '3%', 
        marginRight : '2%', 
        marginBottom : 10, 
        borderRadius : 10, 
        borderColor : "#bdbdbd",
        width : '45%',
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
    },

    archive_text_style : {
        marginLeft : 20,
        marginTop : 15,
        marginBottom : 10

    }
})

export default LabelNoteScreenStyle;