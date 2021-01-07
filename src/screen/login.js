import React, { Component } from 'react'
import { View,Text,ActivityIndicator } from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import {CommonActions} from '@react-navigation/native';

export default class Login extends Component {
    componentDidMount(){
        setTimeout(()=>{
            const resetAction = CommonActions.reset({
				index: 0,
				routes: [
				  {name:'main'}
				]
			  });
			  this.props.navigation.dispatch(resetAction);
        },2000)
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#3366CC'}}>
                <Icon1 name="map-marker-radius" color={'#00CC00'} size={150} style={{padding:100}}/>
                <ActivityIndicator size={50} color={'#00CC00'}/>
            </View>
        )
    }
}
