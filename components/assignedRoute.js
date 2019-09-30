import React, { Component } from 'react';
import { View, Text,StatusBar ,Dimensions,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator, Image} from 'react-native';
 const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
import moment from "moment";
import Service from '../services/Service';
import firebase  from 'react-native-firebase';
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class assignedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true, 
      newarrays:[],
       data: [],
       userData : {}
        
    };
    service = new Service();
  }
   componentDidMount(){
        
     
     for(var i=0; i<=this.state.data.length;i++){
     this.state.newarrays.push({"stat":"1"}) 
     
     }
     
     let products = [];
     // db.listProduct().then((data) => {
     //   console.log('data', data)
     service.getUserData('user').then((keyValue) => {
      //  console.log("local", keyValue);
       var parsedData = JSON.parse(keyValue);
       console.log("json", parsedData);
      this.setState({userData : parsedData})
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
           if(childSnapshot.val().route_info.driver_accepted == 0) {
          // console.log(childSnapshot.val())
           if(childSnapshot.val().route_info)
           firebaseData.push({id : childSnapshot.val().postId, info :  childSnapshot.val().route_info, name : childSnapshot.val().route_info.route_name, assignedby : childSnapshot.val().route_info.assigned_by, start_time : childSnapshot.val().route_info.start_time, remaining : childSnapshot.val().route_info.job_remaining, total: childSnapshot.val().route_info.total_parcel, drops : childSnapshot.val().shipment_drops})
           // childData will be the actual contents of the child
           var childData = childSnapshot.val();
           }
         });
         console.log(firebaseData, 'jsjsj')
         for(var i=0; i< firebaseData.length;i++){
          this.state.newarrays.push({"stat":"1"}) 
           
           }
           this.setState({data : firebaseData})
      
       },  (error) => {
         console.error(error);
       });
     }
     }, (error) => {
       console.log(error) //Display error
       });
    console.log("newarray",this.state.newarrays[0].stat)
     

    this.setState({loading:false});

   }
   getRoutes() {
    
   
  }

   accept = (item, index, id) => {
     console.log(id, 'jndjhdj')
     console.log(this.state.userData, 'uid')
     firebase.database().ref("route-posts/" + this.state.userData.uid).child(id).on("value", (snapshot) => {
      console.log(snapshot.val().route_info.driver_accepted, 'mydata')
     var ref =  firebase.database().ref("route-posts/" + this.state.userData.uid).child(id).child("route_info")
     ref.update ({
      "driver_accepted": 1
   });
    },  (error) => {
      console.error(error);
    });
   
   }
   
   reject = (item, index, id) => {
    firebase.database().ref("route-posts/" + this.state.userData.uid).child(id).on("value", (snapshot) => {
      console.log(snapshot.val().route_info.driver_accepted, 'mydata')
     var ref =  firebase.database().ref("route-posts/" + this.state.userData.uid).child(id).child("route_info")
     ref.update ({
      "driver_accepted": 2
   });
    },  (error) => {
      console.error(error);
    });
  }


  returnTime = (time) => {
    console.log('val', time)
    var m = moment(time, 'HH:mm:ss').format('HH:mm')
    console.log(m)
    return m 
  
  }
  empty = () => {
    return (
      <View style={{height:20,width:dimensions.fullWidth,backgroundColor:"lightgery"}}/>
    );
  };
  
  ShowHideTextComponentView = (items,indexs) =>{
     

    if(this.state.newarrays[indexs].stat == "1"){
      
     console.log("0")
     this.state.newarrays[indexs].stat = "0"
     }else{
       
      this.state.newarrays[indexs].stat = "1"
      console.log("1")

     }
     this.setState({loading:false});
   
    console.log("getarray",this.state.newarrays)
  
   
   }
   backaction(){
    this.props.navigation.goBack()
   }

   renderInitialAddress = (address) => {
    var addressArray = []
    for (obj in address){
      // console.log(address[obj])
      addressArray.push(address[obj])
    }
    // console.log(addressArray, 'as')
    return addressArray[0].shipment_address1 + ',' + addressArray[0].shipment_address2
   }

   renderFinalAddress = (address) => {
    var addressArray = []
    for (obj in address){
   //   console.log(address[obj])
      addressArray.push(address[obj])
    }
    // console.log( addressArray.length, 'hshh')
    // console.log(addressArray[addressArray.length - 1], 'as')
    return addressArray[addressArray.length - 1].shipment_address1 + ',' + addressArray[addressArray.length - 1].shipment_address2
   }
  render() {
    console.log("Full width : ",dimensions.fullWidth);
    console.log("Full Height : ",dimensions.fullHeight);
    
     console.log("renderarray",this.state.newarrays)

      if(this.state.loading == true){

        return (

          <View style={{ flex: 1, paddingTop: 0,justifyContent:"center",alignSelf:"center" }}>
          <View style={{backgroundColor:"#F3F3F7",borderRadius:10,height:70,width:70,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="grey"/></View>
        </View>

        );

      }



    return (
      
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{width:dimensions.fullWidth,height:dimensions.fullHeight,backgroundColor:"lightgrey",marginTop:0}}>
      <MyStatusBar backgroundColor="#00659f" barStyle="light-content" />

       <View style={{width:"100%",height:80,backgroundColor:"#34235a",flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.backaction()} style={{width:60,height:70,alignItems:"center",justifyContent:"center"}}><Image style={{width:30,height:25,marginTop:35}} source={require('../Images/back.png')}/></TouchableOpacity>
         <Text style={{color:"white",marginLeft:0,fontSize:20,fontWeight:"bold",alignSelf:"center",marginTop:25}}>iDriver</Text>
 
      </View>
      <View style={{width:dimensions.fullWidth,height:dimensions.fullHeight - 80,backgroundColor:"lightgrey",}}>

          <FlatList
           style={{width:dimensions.fullWidth,height:dimensions.fullHeight - 80}}
            data={this.state.data}
            //extraData={this.state}
            ListFooterComponent={this.empty()}
            renderItem={({item,index}) => 
            <View style={{marginTop:5}}>
              <View style={{backgroundColor:"white",width:dimensions.fullWidth-20,height:140,flexDirection:"row",marginLeft:10,marginTop:10,borderTopLeftRadius:6,borderBottomLeftRadius:this.state.newarrays[index].stat == "0" ? 6 : 0,borderTopRightRadius:6,borderBottomRightRadius:this.state.newarrays[index].stat == "0" ? 6 : 0}}>
               <View style={{backgroundColor:"#28323c",width:"30%",height:140,justifyContent:"center",alignItems:"center",borderTopLeftRadius:6,borderBottomLeftRadius:this.state.newarrays[index].stat == "0" ? 6 : 0}}>
                 <View style={{backgroundColor:"#28323c",width:"100%",height:120,justifyContent:"center",alignItems:"center"}}>
                   <View style={{backgroundColor:"#28323c",width:"100%",height:20,justifyContent:"center",flexDirection:"row"}}>
                   <Image source={require('../Images/route_distance_icon.png')}  style={{height:18,width:18,}}/>
                  <Text style={{fontSize:16,fontWeight:"normal",marginLeft:10,color:"white"}}>N/A</Text>
                   </View>
                 <View style={{backgroundColor:"#28323c",width:"100%",height:20,justifyContent:"center",flexDirection:"row",marginTop:5}}>
                 <Image source={require('../Images/delivery_man.png')}  style={{height:18,width:18,}}/> 
                    <Text style={{fontSize:16,fontWeight:"normal",marginLeft:10,color:"white"}}>N/A</Text>
                 </View>
                 <View style={{backgroundColor:"#28323c",width:"100%",height:20,justifyContent:"center",flexDirection:"row",marginTop:5}}>
                 <Image source={require('../Images/open_box.png')}  style={{height:18,width:18,}}/>
                 <Text style={{fontSize:16,fontWeight:"normal",marginLeft:10,color:"white"}}>{item.remaining}/{item.total}</Text>
                 </View>
                  <View style={{backgroundColor:"#28323c",width:"100%",height:20,justifyContent:"center",flexDirection:"row",marginTop:5}}>
                  <Image source={require('../Images/timer.png')}  style={{height:18,width:18,}}/>
                  <Text style={{fontSize:16,fontWeight:"normal",marginLeft:10,color:"white"}}>N/A</Text>
                  </View>

                 </View>
               </View>
                 <View style={{backgroundColor:"white",width:"70%",height:140,borderTopRightRadius:6,borderBottomRightRadius:this.state.newarrays[index].stat == "0" ? 6 : 0}}>
                    <View style={{ width:"100%",height:40,borderBottomColor:"black",borderBottomWidth:0.5,flexDirection:"row",alignItems:"center",borderTopRightRadius:6,borderBottomRightRadius:this.state.newarrays[index].stat == "0" ? 6 : 0}}>
                      <View style={{backgroundColor:"white",width:"76%",height:40,flexDirection:"row",alignItems:"center",}}>
                      <Image source={require('../Images/Maps.png')}  style={{height:20,width:20,marginLeft:5}}/>
                      <Text style={{fontSize:15,fontWeight:"bold",fontStyle:"normal",marginLeft:0,color:"#545A5A"}}>{item.name}</Text></View>
                      <View style={{backgroundColor:"white",width:"20%",height:25,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:"red",}}><Text style={{color:"red"}}>{this.returnTime(item.start_time)}</Text></View>
                    </View>
                    <View style={{backgroundColor:"white",width:"100%",height:40,justifyContent:"center"}}><Text style={{marginLeft:5,fontSize:14,fontWeight:"500",color:"#545A5A"}}>{item.assignedby}</Text></View>
                    <View style={{backgroundColor:"white",width:"94%",height:55,marginLeft:"2%",borderWidth:1,borderStyle:"dotted",borderColor:"black",flexDirection:"row"}}>
                    <View style={{backgroundColor:"#28323c",width:"7%",height:55,marginTop:-1,marginLeft:-1}}></View>
                    <View style={{backgroundColor:"white",width:"78%",height:"100%",justifyContent:"center"}}>
                      <Text style={{fontSize:16,fontWeight:"normal",paddingLeft:5,color:"#545A5A"}}>{this.renderInitialAddress(item.drops)}</Text>
                      <Text style={{fontSize:16,fontWeight:"normal",paddingLeft:5,color:"#545A5A"}}>{this.renderFinalAddress(item.drops)}</Text>

                    </View>
                    <TouchableOpacity  onPress={() => this.ShowHideTextComponentView(item,index)} style={{backgroundColor:"white",width:"15%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                    {this.state.newarrays[index].stat == "0"  ? <Image source={require('../Images/down_arrow.png')} style={{height:20,width:20,tintColor:"#332259"}}/>:<Image source={require('../Images/up_arrow.png')}  style={{height:20,width:20,}}/>}
 
                    </TouchableOpacity>

                    </View>


                 </View>
             </View>
             {this.state.newarrays[index].stat == "1" ? <View style={{backgroundColor:"white",width:dimensions.fullWidth-20,height:55,flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomLeftRadius:6,borderBottomRightRadius:6}}>
               <TouchableOpacity onPress={() => this.accept(item,index, item.id)} style={{backgroundColor:"white",width:95,height:45,borderColor:"black",marginLeft:5,borderWidth:0.5,borderRadius:5,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
               <Image source={require('../Images/pauseblank.png')}  style={{height:18,width:18,}}/>
               <Text style={{fontSize:14,fontWeight:'normal',marginLeft:5}}>Accept</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.reject(item,index, item.id)} style={{backgroundColor:"white",width:95,height:45,borderColor:"black",marginLeft:30,borderWidth:0.5,borderRadius:5,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
               <Image source={require('../Images/reject.png')}  style={{height:15,width:15,}}/>
               <Text style={{fontSize:14,fontWeight:'normal',marginLeft:5}}>Reject</Text>
               </TouchableOpacity>

             </View>:null}
             </View>
            }

          />
   </View>
     

      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  
    
 
});
