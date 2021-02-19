import { StyleSheet } from 'react-native';

const BottomBarStyle = StyleSheet.create({

  bottombar_view : {
    width: '100%',  
    backgroundColor : 'white',
    position: 'absolute',
    bottom : 0,
  },

  bottombar : {
    backgroundColor : 'white',
    borderWidth : 1,
    borderColor : '#CACFD2',
},

plus_button_style : {
    marginRight : '10%', 
    borderWidth : 2, 
    marginBottom : 60, 
    height : 60, 
    width : 60, 
    backgroundColor : '#e0e0e0', 
    borderRadius : 30, 
    borderColor : '#e0e0e0',
},

bottom_bar_action_style : {
    marginRight : 10,
}

})

export default BottomBarStyle