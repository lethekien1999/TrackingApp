import React, { Component } from 'react'
import { View,Text,TouchableOpacity ,StyleSheet, Alert} from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header,Left, Right,Icon,Content } from 'native-base'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../ulti/const'
import  MapView, {Marker, Polyline,PROVIDER_GOOGLE} from "react-native-maps";
import haversine from "haversine"
import ModalRecord from '../component/modal'
import { connect } from 'react-redux'
import {switchMapType} from '../redux/actions/maptype.action'

const LATITUDE = 21.015;
const LONGITUDE = 105.833308;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          marginBottom:1,
          routeCoordinates:  [],
          isFull:false,
        };
      }
      onPressChangeMapType(){
        this.props.switchMapType()

      }
      onPressChangeFullMap(){
        this.setState({
          isFull:!this.state.isFull
        })
      }
      componentDidMount() {}
      onPressReset() {
        this.setState({
          routeCoordinates:[]
        })
      }
      onPressMenuRecord(){
        this.props.navigation.navigate('map')
        this.menuModal.close()
      }
      onPressMenuHistory(){
        this.props.navigation.navigate('history')
        this.menuModal.close()
      }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {!this.state.isFull?
                <View>
                <Header style={{backgroundColor:"#DDD"}}>
                    <Left>
                        <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()}/>
                    </Left>
                    
                      <Text style={{fontSize:20,padding:15}}>Bản đồ tổng quan</Text>
                    
                    <Right>
                        <Icon name="location"/>
                    </Right>
                </Header>
                </View>
                :null}

                <View style={{ width: SCREEN_WIDTH,height: this.state.isFull?SCREEN_HEIGHT-30:SCREEN_HEIGHT-100}}>
                    <MapView
                        provider="google"
                        style={{flex:1,marginBottom:this.state.marginBottom}}
                        initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
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


                        
                    </MapView>
                    <TouchableOpacity style={styles.recordBtn} activeOpacity={0.9} onPress={()=>this.menuModal.open()}>
                        <Icon1 name='map-marker-circle' color='#fff' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeMapType} activeOpacity={0.9} onPress={()=>this.onPressChangeMapType()}>
                        <Icon1 name='earth' color='#000' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changeFullMap} activeOpacity={0.9} onPress={()=>this.onPressChangeFullMap()}>
                        <Icon1 name={!this.state.isFull?'arrow-expand':'arrow-collapse'} color='#000' size={25} />
                    </TouchableOpacity>
                    </View>
                    <ModalRecord 
                          ref={ref=>this.menuModal=ref}
                          content_view={
                            <View>
                            <TouchableOpacity 
                              onPress={()=>this.onPressMenuHistory()}
                              style={{
                                borderRadius:0,padding:15,backgroundColor:'#ffffff',paddingHorizontal:30,
                                elevation:5}}>

                              <Text style={{fontSize:15}}>
                                Lịch sử đường đi
                              </Text>

                            </TouchableOpacity>
                            <TouchableOpacity 
                              onPress={()=>this.onPressMenuRecord()}
                              style={{
                                borderRadius:0,padding:15,backgroundColor:'#ffffff',paddingHorizontal:30,
                                elevation:10}}>

                              <Text style={{fontSize:15}}>
                                Theo dõi vị trí
                              </Text>

                            </TouchableOpacity>
                            </View>
                          }
                        />
            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    recordBtn : {
      width:60,
      height:60,
      backgroundColor:'#FF0000',
      borderRadius:100,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      bottom:30,
      right:70
    },
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)