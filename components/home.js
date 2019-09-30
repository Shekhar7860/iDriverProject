import React, { Component } from 'react';
import { View, Text ,StatusBar,StyleSheet,Image,Dimensions,FlatList,TouchableOpacity} from 'react-native';
import {  } from 'react-native-gesture-handler';
// import Database from './Database';
import moment from "moment";

import Service from '../services/Service';
import firebase  from 'react-native-firebase';
const gradientBackground  = 'purple';
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
// const db = new Database();
const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      statusArray:[],
      loading:true
    };
    service = new Service();
  }

  getProducts() {
    let products = [];
    // db.listProduct().then((data) => {
    //   console.log('data', data)
    service.getUserData('user').then((keyValue) => {
    //  console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
   //   console.log("json", parsedData);
     
    if( parsedData) {
      firebase.database().ref("route-posts/" + parsedData.uid).on("value", (snapshot) => {
        console.log(snapshot.val(), 'mydata')
      
        let data = snapshot.val();
            let items = Object.values(data);
             //this.setState({data : items})
            var firebaseData = [];
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          if(childSnapshot.val().route_info !== undefined) {
            if(childSnapshot.val().route_info.driver_accepted == 1) {
          console.log(childSnapshot.val().route_info.route_name, 'mykey')
          firebaseData.push({name : childSnapshot.val().route_info.route_name, assignedby : childSnapshot.val().route_info.assigned_by, start_time : childSnapshot.val().route_info.start_time, remaining : childSnapshot.val().route_info.job_remaining, total: childSnapshot.val().route_info.total_parcel, drops : childSnapshot.val().shipment_drops})
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          }
        }
        });
      
        console.log(firebaseData, 'arr')
        for(var i=0; i < firebaseData.length;i++){
          this.state.statusArray.push({"status":"open", "start": true}) 
          }
        this.setState({data : firebaseData})
      },  (error) => {
        console.error(error);
      });
    }
    }, (error) => {
      console.log(error) //Display error
      });
   // })
    //   firebase.database().ref("route-posts/" + data.firebase_user_id).on("value", (snapshot) => {
    //     console.log(snapshot.val(), 'mydata')
    //     let data = snapshot.val();
    //     let items = Object.values(data);
    //     this.setState({data : items})
    //   //  $scope.jobs = snapshot.val();
    //  }, (error) => {
    //     console.log("Error: " + error.code);
    //  });
    // }).catch((err) => {
    //   console.log(err, 'err');
    //   // this.setState = {
    //   //   isLoading: false
    //   // }
    // })
  }
  componentDidMount(){

    
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getProducts();
      

    
    });
    for(var i=0; i<this.state.data.length;i++){
    this.state.statusArray.push({"status":"open", "start": true}) 
    
    }

    this.setState({loading:false})
    
    
  }


  


  menuAction=()=>{

    this.props.navigation.toggleDrawer();

  }

  openMap = (drops) => {
    this.props.navigation.navigate('mapView', {shipments : drops})
  }
  Viewdetail(val, drops){
  //   console.log(val, 'obj');
  var detailedData = {
    name : val,
    s_drops: drops
  }
     this.props.navigation.navigate('viewdetail', {details : detailedData})

  }

  startService = (items,indexs) =>{
     

    if(this.state.statusArray[indexs].start == false){
      
     console.log("0")
     this.state.statusArray[indexs].start = true
     }else{
       
      this.state.statusArray[indexs].start = false
      console.log("1")

     }
     this.setState({loading:false});
   
    console.log("getarray",this.state.statusArray)
  
   
   }
  tapAction = (items,indexs) =>{
     

    if(this.state.statusArray[indexs].status == "open"){
      
     console.log("0")
     this.state.statusArray[indexs].status = "close"
     }else{
       
      this.state.statusArray[indexs].status = "open"
      console.log("1")

     }
     this.setState({loading:false});
   
    console.log("getarray",this.state.statusArray)
  
   
   }

   renderInitialAddress = (address) => {
    var addressArray = []
    for (obj in address){
      // console.log(address[obj])
      addressArray.push(address[obj])
    }
    console.log(addressArray, 'as')
    return addressArray[0].shipment_address1 + ',' + addressArray[0].shipment_address2
   }

   returnTime = (time) => {
     console.log('val', time)
     var m = moment(time, 'HH:mm:ss').format('HH:mm')
     console.log(m)
     return m 
   
   }
   renderFinalAddress = (address) => {
    var addressArray = []
    for (obj in address){
   //   console.log(address[obj])
      addressArray.push(address[obj])
    }
    console.log( addressArray.length, 'hshh')
    console.log(addressArray[addressArray.length - 1], 'as')
    return addressArray[addressArray.length - 1].shipment_address1 + ',' + addressArray[addressArray.length - 1].shipment_address2
   }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item,index}) => (
    
    <View style={{width:dimensions.fullWidth , height:this.state.statusArray[index].status == "close" ? 140 : 200,backgroundColor:"lightgrey" , marginTop:5}}>
      <View style={{width:dimensions.fullWidth - 20 , height:this.state.statusArray[index].status == "close" ? 125 : 185,backgroundColor:"transparent" ,marginLeft:10, marginTop:2.5,borderRadius:6,}}>
 
      <View style={{width:dimensions.fullWidth - 20 ,height:125,backgroundColor:"transparent",flexDirection:"row"}}>
        <View style={{width:"25%",height:"100%",backgroundColor:this.state.statusArray[index].start == true ? '#28323C' : '#3cd2ad',borderTopLeftRadius:6,borderBottomLeftRadius:this.state.statusArray[index].status == "close" ? 6 : 0}}>
         <View style={{width:"80%",height:30,backgroundColor:"transparent",marginTop:5,marginLeft:10,flexDirection:"row",alignItems:"center"}}><Image source={require('../Images/route_distance_icon.png')} style={{width:18,height:18}}/>
         <Text style={{margin:8,color:"white"}}>0.0</Text>
         </View>
         <View style={{width:"80%",height:30,backgroundColor:"transparent",marginTop:0,marginLeft:10,flexDirection:"row",alignItems:"center"}}><Image source={require('../Images/delivery_man.png')} style={{width:18,height:18}}/>
         <Text style={{margin:8,color:"white"}}>0.0</Text>
         </View>
         <View style={{width:"80%",height:30,backgroundColor:"transparent",marginTop:0,marginLeft:10,flexDirection:"row",alignItems:"center"}}><Image source={require('../Images/open_box.png')} style={{width:18,height:18}}/>
         <Text style={{margin:8,color:"white"}}>{item.remaining}/{item.total}</Text>
         </View>
         <View style={{width:"80%",height:30,backgroundColor:"transparent",marginTop:0,marginLeft:10,flexDirection:"row",alignItems:"center"}}><Image source={require('../Images/timer.png')} style={{width:18,height:18}}/>
         <Text style={{margin:8,color:"white"}}>0.0</Text>
         </View>
        </View>
  <View style={{width:"75%",height:"100%",backgroundColor:"transparent"}}>
    <View style ={{width:"100%",height:70,backgroundColor:"white",borderTopRightRadius:6}}>
      <Text style={{fontSize:18,fontWeight:"bold",margin:5}}>{item.name}</Text>
      <View style={{backgroundColor:"white",width:80,height:25,position:"absolute",right:5,top:5,alignItems:"center",flexDirection:"row"}}>
      <Text style={{marginLeft:10,color:"red"}}>{this.returnTime(item.start_time)}</Text>
      <Image source={require('../Images/clock.png')} style={{width:18,height:18,marginLeft:8}}/>  

      </View>
      <View style={{backgroundColor:"white",width:150,height:25,left:5,marginTop:5,flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/man_user.png')} style={{width:15,height:15,}}/>  
<Text style={{marginLeft:5,color:"#34235a"}}>{item.assignedby}</Text>
</View>
    </View>
    <View style={{width:"100%",height:55,backgroundColor:"white",flexDirection:"row",borderTopWidth:0.5,borderBottomWidth:0.5,borderColor:"lightgrey",borderBottomRightRadius:this.state.statusArray[index].status == "close" ? 6 : 0}}> 
 
    <View style={{backgroundColor:"white",height:"100%",width:"80%",}}>
      <View style={{backgroundColor:"white",height:"40%",width:"100%",flexDirection:"row",marginTop:5}}><Image source={require('../Images/Maps.png')} style={{width:20,height:20,marginLeft:3,tintColor:"#545A5A"}}/><Text style={{marginLeft:3,color:"#545A5A",fontWeight:"bold"}}>{this.renderInitialAddress(item.drops)}</Text></View>
      <View style={{backgroundColor:"white",height:"40%",width:"100%",flexDirection:"row",alignItems:"center"}}><Image source={require('../Images/circle.png')} style={{width:13,height:13,marginLeft:7,tintColor:"#545A5A"}}/><Text style={{marginLeft:5,color:"#545A5A",fontWeight:"bold"}}>{this.renderFinalAddress(item.drops)}</Text></View>
      </View>
      <View style={{backgroundColor:"white",width:"20%",height:"80%",alignItems:"center",justifyContent:"center"}}>
      <TouchableOpacity onPress={() => this.tapAction(item,index)}>
        <Image source={require('../Images/down_arrow.png')} style={{width:20,height:20,tintColor:"#545A5A"}}/>  
      </TouchableOpacity>
      </View>

    
  </View>
</View>
  </View>

{ this.state.statusArray[index].status == "close" ? null :  <View style={{width:dimensions.fullWidth - 20, height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center",borderBottomLeftRadius:6,borderBottomRightRadius:6}}>
  <TouchableOpacity style={{backgroundColor:"white",width:(dimensions.fullWidth - 20)/4,height:50,margin:12,justifyContent:"center",alignItems:"center"}} onPress={() => this.startService(item,index)}>
  <Image source={this.state.statusArray[index].start == true ? require('../Images/start.png') : require('../Images/pause.png')} style={{width:25,height:25,}}/> 
  <Text>{this.state.statusArray[index].start == true ? 'Start' : 'Pause'}</Text> 

  </TouchableOpacity>
  <TouchableOpacity onPress={() => this.Viewdetail(item.name, item.drops)} style={{backgroundColor:"white",width:(dimensions.fullWidth - 20)/4,height:50,margin:20,justifyContent:"center",alignItems:"center"}}>
  <Image source={require('../Images/detail.png')} style={{width:25,height:25,}}/>  
  <Text>View Details</Text> 

  </TouchableOpacity> 
  <TouchableOpacity style={{backgroundColor:"white",width:(dimensions.fullWidth - 20)/4,height:50,margin:13,justifyContent:"center",alignItems:"center"}} onPress={() => this.openMap(item.drops)}>
  <Image source={require('../Images/map.png')} style={{width:25,height:25,}}/>  
  <Text>View Map</Text> 

  </TouchableOpacity>
</View>}
 
         </View>
      </View>
  );

  render() {
 console.log('this', this.state.data)
    if(this.state.loading == true){

      return(

        <View></View>

      );

    }

    return (
      <View style={{flex:1}}>
        <MyStatusBar backgroundColor="#00659f" barStyle="light-content" />

        <View style={{width:"100%",height:80,backgroundColor:"#34235a",flexDirection:"row"}}>
      <TouchableOpacity onPress={() => this.menuAction()} style={{width:60,height:70,alignItems:"center",justifyContent:"center"}}><Image style={{width:30,height:25,marginTop:35}} source={require('../Images/side_menu.png')}/></TouchableOpacity>
      <Text style={{color:"white",marginLeft:0,fontSize:20,fontWeight:"bold",alignSelf:"center",marginTop:25}}>iDriver</Text>
      <View style={{width:60,height:70,alignItems:"center",justifyContent:"center",marginLeft:dimensions.fullWidth/2,backgroundColor:"transparent"}}><TouchableOpacity style={{width:60,height:70,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}><Image style={{width:30,height:25,marginTop:35}} source={require('../Images/dott.png')}/></TouchableOpacity></View>
 
        </View>

        <View style={{width:dimensions.fullWidth,height:dimensions.fullHeight - 80,backgroundColor:"lightgrey"}}>
      <FlatList
        style={{width:dimensions.fullWidth,height:dimensions.fullHeight - 80}}
        data={this.state.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
     
      backgroundColor: 'white',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#7841c5',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});