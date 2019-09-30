/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {  View, Text ,StatusBar,StyleSheet,Image,Dimensions,FlatList,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import {  } from 'react-native-gesture-handler';
const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 30.7046,
        longitude: 76.7179,
        latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive',
   
      },
      firstDropLat : "", 
      firstDropLong : "", 
      secondDrop : "",
      thirdDrop : ""
    };
  }

  componentDidMount = () => {
    if(this.props.navigation.state.params)
    {

      console.log(this.props.navigation.state.params)
      var addresses = this.props.navigation.state.params.shipments
      var addressArray = []
      for (obj in addresses){
        // console.log(address[obj])
        addressArray.push(addresses[obj])
      }
      console.log(addressArray, 'as')
      this.setState({firstDropLat: addressArray[0].shipment_latitude})
      this.setState({firstDropLong: addressArray[0].shipment_longitude})
      this.setState({region:  {
        latitude: addressArray[0].shipment_latitude,
        longitude: addressArray[0].shipment_longitude,
        latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive',
   
      }})
    }
  }
  menuAction=()=>{

    this.props.navigation.goBack()

  }

  render() {
    var markers = [
      {
        latitude: 30.7046,
        longitude: 76.7179,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
    return (
      <View style={styles.container}>
   <View style={{width:"100%",height:70,backgroundColor:"#34235a",flexDirection:"row"}}>
      <TouchableOpacity onPress={() => this.menuAction()} style={{width:60,height:70,alignItems:"center",justifyContent:"center"}}><Image style={{width:30,height:25,marginTop:20}} source={require('../Images/back.png')}/></TouchableOpacity>
      <Text style={{color:"white",marginLeft:0,fontSize:20,fontWeight:"bold",alignSelf:"center",marginTop:20}}>iDriver</Text>
      <View style={{width:60,height:70,alignItems:"center",justifyContent:"center",marginLeft:dimensions.fullWidth/2,backgroundColor:"transparent"}}><TouchableOpacity style={{width:60,height:70,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}><Image style={{width:30,height:25,marginTop:20}} source={require('../Images/dott.png')}/></TouchableOpacity></View>
 
        </View>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
         
        >
         <MapView.Marker
          coordinate={ this.state.region }
        />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
