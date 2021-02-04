import { StyleSheet } from 'react-native'

const HomeCss = StyleSheet.create({

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
    }
})

export default HomeCss