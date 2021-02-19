import { StyleSheet } from 'react-native';

const AddNotesStyle = StyleSheet.create({

    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
      },

      header_style : {
        backgroundColor : 'transparent'
      },

      header_icon_style : {
        marginRight : 10
      },

      title_style : {
        marginLeft : 20,
        marginRight : 20,
        marginTop : 20,
        fontSize : 22,
      },
    
      note_style : {
        marginLeft : 20,
        marginRight : 20,
        fontSize : 18,
      },

      bottom_view : {
        width: '100%',
        position: 'absolute',
        bottom : 0,
      },

      bottom_appbar_style : {
        backgroundColor : 'white' 
      },

      label_text_container : {
        marginLeft : 25, 
        flexWrap : 'wrap', 
        marginTop : 10,
        flexDirection : 'row'
    },

    label_text: {
        borderWidth : 1, 
        paddingTop: 5, 
        paddingBottom : 5, 
        paddingLeft : 15, 
        paddingRight : 15, 
        borderColor : 'grey', 
        borderRadius : 40,
        marginRight : 10
    }

})

export default AddNotesStyle;