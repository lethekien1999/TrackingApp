import React, { Component } from 'react'
import { View,Text,TouchableOpacity,FlatList,StyleSheet } from 'react-native'
import { Header,Left, Right,Icon } from 'native-base'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../ulti/const'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient1 from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'

class Item extends Component {
    constructor(props){
        super(props)
    }
    convertTime = (t) => {
        const time = new Date(t)
        return time.getDay() + ' tháng ' + time.getMonth() + ', ' + time.getFullYear()

    }
    onPressHis(){
        this.props.navigation.navigate('track',{data:this.props.data})
    }
    render(){
        const {data} = this.props
        console.log(this.props.data )
        return (
            <View style={{flex:1,padding:20}}>
                <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onPressHis()}>
                    <Icon1 name="run-fast" size={50}/>
                    <View style={{paddingLeft:30}}>
                        <Text>Thời gian bắt đầu : {this.convertTime(data.TimeStart)}</Text>
                        <Text>Thời gian ghi : {data.time} giây</Text>
                        <Text>Khoảng cách : {data.distanceTravelled}</Text>
                    </View>
                    <Icon1 name="arrow-right" size={50}/>
                </TouchableOpacity>
            </View>
        )
    }
}



export default class History extends Component {
    constructor(props){
        super(props)
        this.state ={
            history:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('history').then((value)=>{
            const hist_parse = JSON.parse(value)
            this.setState({
                history:hist_parse
            })
        })
       

    }
    onPressDelete(){
        this.setState({
            history:[]
        })
        AsyncStorage.setItem('history',JSON.stringify([]))
    }
    render() {
        return (
            <View style={{flex:1,width:SCREEN_WIDTH,height:SCREEN_HEIGHT,backgroundColor:'#fff'}}>
                <Header style={{backgroundColor:"#DDD"}}>
                    <Left>
                        <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()}/>
                    </Left>
                    <Right>
                        <Icon name="location"/>
                    </Right>
                </Header>
                
                <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-150}}>
                    {this.state.history.length==0?
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:20,paddingTop:30}}>Chưa có lịch sứ</Text>
                    </View>:
                    <FlatList
                    data={this.state.history}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=> (
                            <View style={{flex:1}} >
                                <Item 
                                    data={item}
                                    navigation={this.props.navigation}
                                    />
                            </View>
                        )
                    }
                    />}
                </View>
                
                    <TouchableOpacity style={styles.deleteCoverBtn} onPress={()=>this.onPressDelete()}>
                    <LinearGradient1 colors={['#1E90FF','#1874CD', '#0000FF']}  style={styles.deleteBtn}>
                        <Text style={{fontSize:20,color:'#fff'}}>Xóa toàn bộ lịch sử</Text>
                    </LinearGradient1>
                    </TouchableOpacity>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    deleteBtn :{
        width:300,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    deleteCoverBtn:{
        position:'absolute',
        bottom:10,
        right:40
    }
})
