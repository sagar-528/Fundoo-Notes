import { StyleSheet } from 'react-native'

const NoteCss = StyleSheet.create({

    container: {
        flex : 1
      },
      bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'grey'
      },
      fab: {
        position: 'absolute',
        right: 16,
        bottom: 28,
        backgroundColor: 'grey'
      },
  
    appbar_content_style : {
        fontSize: 18
    },
  
    avatar_style : {
        marginRight : 15, 
        marginLeft : 5
    },
    app_name : {
      fontSize : 25,
      fontWeight : 'bold',
      marginLeft : 20,
      marginTop : 10,
      marginBottom : 15
  },
  
  drawer_item_style : {
      paddingLeft : 10,
      height : 50,
      justifyContent : 'center',
      color : 'red'
  },
  
  drawer_section_style : {
      borderBottomWidth : 0.6,
      borderColor : 'grey'
  },

  header_style : {
    backgroundColor : 'transparent'
  },

  mainContainer : {
    flex : 1,
    backgroundColor : 'white'
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
}

})

export default NoteCss