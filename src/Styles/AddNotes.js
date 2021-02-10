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
})

export default AddNotesStyle;