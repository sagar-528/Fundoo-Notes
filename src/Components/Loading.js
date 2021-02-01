import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const Loading = () => {
return (
<View style = {styles.container}>
 <Text style = {{ fontSize:20 }}>Loading...</Text>
 <ActivityIndicator size = "large" color = "grey" />
</View>
)

}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
}
})