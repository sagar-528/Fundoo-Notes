import { StyleSheet } from 'react-native'

const ProfileStyle = StyleSheet.create({

    image_container_style : {
        alignItems : 'center'
    },

    text_container_style : {
        flexDirection : "row", 
        marginTop : 10
    },

    text_style : {
        fontWeight : 'bold',
        color : 'black',
        fontSize : 16
    },

    logout_button_styles : {
        width : 200,
        backgroundColor : "#339EFF",
        borderRadius : 20,
    },

    edit_button_style : {
        flex : 1, 
        justifyContent : 'flex-end', 
        alignItems : 'flex-end'
    }

})

export default ProfileStyle