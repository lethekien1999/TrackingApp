import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screen/home'
import HistoryScreen from './src/screen/history'
import RecordScreen from './src/screen/record'
import LoginScreen from './src/screen/login'
import HistoryMapScreen from './src/screen/history.map'
import { Header,Left, Right,Icon } from 'react-base'
import {Provider} from 'react-redux';
import store from './src/redux/store'

const mapStack =()=>{
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator initialRouteName="home">
        <Drawer.Screen name="home" component={HomeScreen} options={{title:"Bản đồ"}}/>
        <Drawer.Screen name="history" component={HistoryScreen} options={{title:"Lịch sử đường đi"}}/>
      </Drawer.Navigator>
  )

}

export default class App extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    const stack = createStackNavigator();
    return (
      <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator initialRouteName='login'>
          <stack.Screen name='main' component={mapStack} options={{headerShown:false}}/>
          <stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}/>
          <stack.Screen name='map' component={RecordScreen} options={{title:"Theo dõi vị trí"}}/>
          <stack.Screen name='track' component={HistoryMapScreen} options={{title:"Lịch sử"}}/>
        </stack.Navigator>
    </NavigationContainer>
    </Provider>

    )}
}
const styles = StyleSheet.create({
  
});
