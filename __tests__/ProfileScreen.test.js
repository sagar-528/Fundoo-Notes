import React from 'react';
import {shallow} from 'enzyme';
import ProfileScreen from '../src/Components/Dashboard/ProfileScreen'
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-paper'
import UserServices from '../Service/UserServices'

describe('test ProfileScreen', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<ProfileScreen />)
        expect(component).toMatchSnapshot();
    })

    it('When onPress event of logout button it will navigate to Login Screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ProfileScreen onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleLogoutButton();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.signout.then(user => expect(navigation.navigate).toBeCalledWith('SignIn'))
    })

    it('When component in Profile component', () => {
        const component = shallow(<ProfileScreen />)
        expect(component.find(ImageBackground)).toHaveLength(1)
        expect(component.find(Text)).toHaveLength(2)
        expect(component.find(Button)).toHaveLength(1)
        expect(component.find(TouchableOpacity)).toHaveLength(1)
    })

    it('When onpress event of image edit buttton it will call the RBSheet open method', async () => {
        const RBSheet = { open : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ProfileScreen onPress = {onPressEvent} RBSheet = {RBSheet}/>)
        const instance = component.instance();
        await instance.handleImageEditButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(RBSheet.open).toHaveBeenCalled();
    })

    it('When onpress event of close buttton it will call the RBSheet close method', async () => {
        const RBSheet = { close : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<ProfileScreen onPress = {onPressEvent} RBSheet = {RBSheet}/>)
        const instance = component.instance();
        await instance.handleCancel();
        expect(onPressEvent).toHaveBeenCalled();
        expect(RBSheet.close).toHaveBeenCalled();
    })

})