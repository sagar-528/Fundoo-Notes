import { StyleSheet } from 'react-native';

const NoteCardStyle = StyleSheet.create({
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
        width : '44.5%',
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

    label_text: {
        borderWidth : 1, 
        paddingTop: 3, 
        paddingBottom : 3, 
        paddingLeft : 10, 
        paddingRight : 10, 
        borderColor : 'grey', 
        borderRadius : 40,
        marginTop : 8,
        marginRight : 10,
        marginBottom : 5
    },

    chip_style : {
        marginTop : 6, 
        marginRight : 10, 
        borderColor : 'black', 
        backgroundColor : 'white', 
        borderWidth : 1,
        marginBottom : 3,
    },

    chip_faded_style : {
        marginTop : 6, 
        marginRight : 10, 
        borderColor : 'grey', 
        backgroundColor : 'white', 
        borderWidth : 1,
        marginBottom : 3,
    },

    archive_text : {
        borderWidth : 1, 
        paddingTop: 3, 
        paddingBottom : 3, 
        paddingLeft : 10, 
        paddingRight : 10, 
        borderColor : 'grey', 
    }
    
})

export default NoteCardStyle; 