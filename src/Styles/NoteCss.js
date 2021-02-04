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
  }
  
})

export default NoteCss