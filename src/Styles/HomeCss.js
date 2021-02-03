import { StyleSheet } from 'react-native'

const HomeCss = StyleSheet.create({

    container: {
        flex : 1,
        backgroundColor : 'white'
      },
      bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      },
      fab: {
        position: 'absolute',
        right: 16,
        bottom: 28,
      },
  
    appbar_content_style : {
        fontSize: 18
    },
  
    avatar_style : {
        marginRight : 15, 
        marginLeft : 5
    }
})

export default HomeCss