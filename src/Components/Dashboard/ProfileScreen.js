import React, { Component } from 'react'
import UserServices from '../../../Service/UserServices'
import ProfileStyle from '../../Styles/ProfileScreen'
import {View, Text, ImageBackground, TouchableOpacity, Platform} from 'react-native'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import RBSheet from 'react-native-raw-bottom-sheet'
import RBSheetProfileOption from './RBSheetProfileOption'
import Firebase from '../../../Environment/Firebase'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch

window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : ['image/']
}).build()

export class ProfileScreen extends Component {

constructor(props) {
    super(props)

    this.state = {
        userDetails : '',
        photo : this.props.photo,
        userId : '',
        showSubmit : false,
        fullName : ''
    }
}

componentDidMount = async() => {
    const credential = await Keychain.getGenericPassword();
    const UserCredential = JSON.parse(credential.password);
    await this.setState({
        userId : UserCredential.user.uid
    })
    UserServices.readUserDataFromRealtimeDatabase(UserCredential.user.uid)
        .then(async data => {
            await this.setState({
                userDetails : data,
                fullName : data.firstName + ' ' + data.lastName
            })
        })
}

handleLogoutButton = async () => {
    const {onPress} = this.props;
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    UserServices.signout()
    .then(() => this.props.navigation.navigate('SignIn'))
    .catch(error => console.log(error))
    // onPress();
}

handleChoosePhotoFromLibrary = () => {
    this.RBSheet.close()
    const options = {
        mediaType : 'photo',
        maxWidth : 100,
        maxHeight : 100,
    } 
    launchImageLibrary(options, async response => {
        if(!response.didCancel) {  
            this.uploadImage(response.uri)
                .then(async url => { 
                    await this.setState({
                        photo: url,
                        showSubmit : true
                    }) 
                    UserServices.addImageUrlToUser(this.state.userId, this.state.photo)
                })
                .catch(error => console.log(error))  
        }
    })
}

handleTakePhoto = () => {
    this.RBSheet.close()
    const options = {
        mediaType : 'photo',
        maxWidth : 100,
        maxHeight : 100,
    } 
    launchCamera(options, async response => {
        if(!response.didCancel) {  
            this.uploadImage(response.uri)
                .then(async url => { 
                    await this.setState({
                        photo: url,
                        showSubmit : true
                    }) 
                    UserServices.addImageUrlToUser(this.state.userId, this.state.photo)
                })
                .catch(error => console.log(error))  
        }
    })
}


uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
        let uploadBlob = null
        const imageRef = Firebase.storage().ref(this.state.userId)
        fs.readFile(uri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
          })
          .catch((error) => {
            reject(error)
        })
      })
}

handleCancel = () => {
    const {onPress} = this.props
    this.RBSheet.close()
    // onPress();
}

handleImageEditButton = () => {
    const {onPress} = this.props
    this.RBSheet.open()
    // onPress();
}

    render() {
        return (
            <View>
               <View style = {ProfileStyle.image_container_style}>
                    <ImageBackground
                        source = {(this.state.photo == '') ? require('../../../src/Assets/profile.jpg') :{uri : this.state.photo}}
                        style = {{height : 100, width : 100}}>
                        <View style = {ProfileStyle.edit_button_style}>
                        <TouchableOpacity
                            onPress = {this.handleImageEditButton}>
                            <Icon name="edit" size={24} />
                                </TouchableOpacity>
                            </View>
                    </ImageBackground>
                    </View> 
                <View style = {{marginTop : 20, marginBottom : 20}}>
                    <View style = {ProfileStyle.text_container_style}>
                        <Text style = {ProfileStyle.text_style}>{this.state.fullName}</Text>
                    </View>
                    <View style = {ProfileStyle.text_container_style}>
                        <Text style = {ProfileStyle.text_style}>{this.state.userDetails.email}</Text>
                    </View>
                </View>
                
                <View style = {{alignSelf : 'center', marginBottom : 10, marginTop : 10}}>
                    {(this.state.showSubmit) ? (
                    <Button 
                        style = {ProfileStyle.logout_button_styles}
                        color = 'white'
                        onPress = {this.props.changeImage}>
                            Submit
                    </Button> 
                    ) : null}
                </View>

                <View style = {{alignSelf : 'center'}}>
                    <Button 
                        style = {ProfileStyle.logout_button_styles}
                        color = 'white'
                        onPress = {this.handleLogoutButton}>
                            logout
                    </Button> 
                </View>
                <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {150}
                    customStyles = {{
                        container : {
                            borderTopWidth : 1,
                            borderColor : "#d3d3d3", 
                            padding : 20
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                        <RBSheetProfileOption
                            takePhoto = {this.handleTakePhoto} 
                            chooseFromLibrary = {this.handleChoosePhotoFromLibrary} 
                            cancel = {this.handleCancel}/>
                </RBSheet>
            </View>
        )
    }
}

export default ProfileScreen
