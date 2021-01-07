import React, { Component } from 'react'
import { View,Text,TouchableOpacity ,StyleSheet, Alert ,Linking} from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header,Left, Right,Icon } from 'native-base'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../ulti/const'
import  MapView, {Marker, Polyline,PROVIDER_GOOGLE} from "react-native-maps";
import haversine from "haversine"
import { connect } from 'react-redux'
import LinearGradient1 from 'react-native-linear-gradient';
import {switchMapType} from '../redux/actions/maptype.action'
import getDirections from 'react-native-google-maps-directions'
import AsyncStorage from "@react-native-async-storage/async-storage";


const LATITUDE = 21.015;
const LONGITUDE = 105.833308;

class HistoryMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
          marginBottom:1,
          data:this.props.route.params.data
        };
      }
      onPressChangeMapType(){
        this.props.switchMapType()

      }
      componentDidMount() {
        
      }
      handleGetDirection =()=>{
        if(this.state.data.routeCoordinates.length>1){
        const CoordinatesStart = this.state.data.routeCoordinates[0]
        const CoordinatesEnd = this.state.data.routeCoordinates[this.state.data.routeCoordinates.length-1]
        const data = {
          source: {
           latitude: CoordinatesEnd.latitude,
           longitude: CoordinatesEnd.longitude
         },
         destination: {
           latitude: CoordinatesStart.latitude,
           longitude: CoordinatesStart.longitude
         },
         params: [
           {
             key: "travelmode",
             value: "driving"        // may be "walking", "bicycling" or "transit" as well
           }
         ]
       }
       getDirections(data)
      } else {
         Alert.alert("Bạn chưa di chuyển")
       }
    
      
      }
      getTime = t =>{
        const ditgit = n => n<10 ? `0${n}`:`${n}`

        const sec = ditgit(Math.floor(t%60));
        const min = ditgit(Math.floor((t/60)%60));
      
        return min + ':' + sec; 
      }

     
  
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                  <Text style={{fontSize:30,padding:10}}>{this.getTime(this.state.data.time)}</Text>
                  <View style={{width:3,height:100,backgroundColor:'#000'}}></View>
                  <Text style={{fontSize:30,padding:10}}>{this.state.data.distanceTravelled.toFixed(3)}</Text>
                </View>
                <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT-200 }}>
                    <MapView
                        provider="google"
                        style={{flex:1,marginBottom:this.state.marginBottom}}
                        region={{
                        latitude: this.state.data.routeCoordinates[0].latitude,
                        longitude: this.state.data.routeCoordinates[0].longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                        }}
                        mapType={this.props.mapType}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        pitchEnabled={true}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsCompass={true}
                        showsBuildings={true}
                        showsTraffic={true}
                        showsIndoors={true}
                        onMapReady={()=>this.setState({marginBottom:0})}
                        showsScale={true}>
                          <Polyline coordinates={this.state.data.routeCoordinates} strokeWidth={5} strokeColor={'#000'}/>
                          <Marker
                                title={'Start'}
                                coordinate={{
                                longitude: this.state.data.routeCoordinates[0].longitude,
                                latitude: this.state.data.routeCoordinates[0].latitude,
                                }}
                                pinColor={'#00FF00'}
                            />
                            <Marker
                                title={'End'}
                                coordinate={{
                                longitude: this.state.data.routeCoordinates[this.state.data.routeCoordinates.length-1].longitude,
                                latitude: this.state.data.routeCoordinates[this.state.data.routeCoordinates.length-1].latitude,
                                }}
                            />
                    </MapView>
                    <TouchableOpacity style={styles.changeMapType} activeOpacity={0.9} onPress={()=>this.onPressChangeMapType()}>
                        <Icon1 name='earth' color='#000' size={25} />
                    </TouchableOpacity>
                    
                   
                    <View>
                     <TouchableOpacity activeOpacity={0.9} onPress={()=>this.handleGetDirection()} style={styles.btnMapCover}>
                     <LinearGradient1 colors={['#1E90FF','#1874CD', '#0000FF']} style={styles.btnRecord}>
                       <Text style={{color:'#fff'}}>Tìm đường đi ngắn nhất</Text>
                     </LinearGradient1>
                   </TouchableOpacity>
                   </View>
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    changeMapType : {
      width:40,
      height:40,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      top:80,
      right:10,
      elevation:5
    },
    changeFullMap : {
      width:40,
      height:40,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      top:20,
      left:10,
      elevation:5
    },
    btnRecord:{
      flex:1,
      borderRadius:10,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      elevation:5
    },
    btnStopCover:{
      width:200,
      height:40,
      position:'absolute',
      bottom:30,
      right:100,
    },
    btnResetCover:{
      width:200,
      height:40,
      position:'absolute',
      bottom:30,
      right:100,
    },
    btnMapCover:{
      width:200,
      height:40,
      position:'absolute',
      bottom:90,
      right:100,
    }
  });
const mapDispatchToProps = (dispatch) => {
  return {
    switchMapType: ()=>{dispatch(switchMapType())}
  }
}
const mapStateToProps = (state) => {
  return {
    mapType :state.mapType
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryMap)