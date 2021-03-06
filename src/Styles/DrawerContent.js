import { StyleSheet } from 'react-native';

const DrawerContentStyle = StyleSheet.create({
    
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

    label_edit_style : {
        flexDirection : 'row', 
        paddingLeft : 30, 
        marginTop : 15, 
        marginBottom : 10
    }
})

export default DrawerContentStyle;