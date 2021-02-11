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
        fontWeight : 'bold'
    },

    logout_button_styles : {
        width : 200,
        backgroundColor : "#339EFF",
        borderRadius : 20,
    }

})

export default ProfileStyle