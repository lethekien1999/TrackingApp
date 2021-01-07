import React, {Component} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Geo from '@react-native-community/geolocation';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const LATITUDE = 21.015;
const LONGITUDE = 105.833308;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: 0,
      reset: true,
      coordinateStart: {
        latitude: 0,
        longitude: 0,
      },
      coordinateEnd: {
        latitude: 0,
        longitude: 0,
      },
      routeCoordinates: [],
      longitude: LONGITUDE,
      latitude: LATITUDE,
    };
  }
  onPressRecordStart() {
    Geo.getCurrentPosition(
      (position) => {
        const latitudeS = position.coords.latitude;
        const longitudeS = position.coords.longitude;
        this.setState({
          reset: false,
          record: 1,
          coordinateStart: {
            latitude: latitudeS,
            longitude: longitudeS,
          },
          routeCoordinates: [{latitude: latitudeS, longitude: longitudeS}],
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geo.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newCordinates = {
          latitude,
          longitude,
        };
        const {routeCoordinates} = this.state;
        this.marker.animateMarkerToCoordinate(newCordinates, 300);

        this.setState({
          latitude: latitude,
          longitude: longitude,
          routeCoordinates: routeCoordinates.concat([newCordinates]),
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
    );
  }
  onPressRecordEnd() {
    Geo.clearWatch(this.watchID);
    Geo.getCurrentPosition(
      (position) => {
        const {routeCoordinates} = this.state;
        const latitudeE = position.coords.latitude;
        const longitudeE = position.coords.longitude;
        this.setState({
          reset: false,
          record: 0,
          coordinateEnd: {
            latitude: latitudeE,
            longitude: longitudeE,
          },
          routeCoordinates: routeCoordinates.concat([
            {latitude: latitudeE, longitude: longitudeE},
          ]),
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  componentDidMount() {}
  onPressReset() {
    Geo.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({
          record: 0,
          reset: true,
          coordinateStart: {
            latitude: 0,
            longitude: 0,
          },
          coordinateEnd: {
            latitude: 0,
            longitude: 0,
          },
          routeCoordinates: [],
          longitude: longitude,
          latitude: latitude,
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={{flex: 1}}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            followsUserLocation={true}
            loadingEnabled={true}
            showsMyLocationButton={true}
            showsUserLocation={true}>
            {this.state.record ? (
              <Marker
                ref={(marker) => {
                  this.marker = marker;
                }}
                coordinate={{
                  longitude: this.state.longitude,
                  latitude: this.state.latitude,
                }}
                title={'TestTitle'}
              />
            ) : null}
            {this.state.coordinateStart.latitude != 0 ? (
              <Marker
                title={'Start'}
                coordinate={{
                  longitude: this.state.coordinateStart.longitude,
                  latitude: this.state.coordinateStart.latitude,
                }}
              />
            ) : null}
            {this.state.coordinateEnd.latitude != 0 ? (
              <Marker
                title={'End'}
                coordinate={{
                  longitude: this.state.coordinateEnd.longitude,
                  latitude: this.state.coordinateEnd.latitude,
                }}
              />
            ) : null}
            {!this.state.reset ? (
              <Polyline
                coordinates={this.state.routeCoordinates}
                strokeWidth={5}
              />
            ) : null}
          </MapView>
          <View>
            <Text>Tọa độ bắt đầu :{this.state.coordinateStart.longitude} </Text>

            <Text>
              số lượng tọa độ được lưu trong quãng đường
              {this.state.routeCoordinates.length}
            </Text>
            <Text>Tọa độ kết thúc{this.state.coordinateEnd.latitude}</Text>
            <Text>Đang ghi :{this.state.record}</Text>
          </View>
        </View>
        <View style={styles.record}>
          {this.state.reset || this.state.record ? (
            <TouchableOpacity
              style={styles.coverbtn}
              onPress={
                this.state.record
                  ? this.onPressRecordEnd.bind(this)
                  : this.onPressRecordStart.bind(this)
              }>
              <Icon
                name={this.state.record ? 'stop' : 'play-arrow'}
                size={25}
                color={'#fff'}
              />
            </TouchableOpacity>
          ) : null}
          {!this.state.record ? (
            <TouchableOpacity onPress={this.onPressReset.bind(this)}>
              <Text>Reset</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 200,
  },
  record: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverbtn: {
    backgroundColor: '#333',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});
