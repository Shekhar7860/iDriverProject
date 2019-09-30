import React, { Component } from 'react';
import { View,AsyncStorage, Text ,Image,ImageBackground,TouchableOpacity} from 'react-native';
import {  } from 'react-native-gesture-handler';
import Service from '../services/Service';
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:["Akash","djsd","djskd"],
      statusArray:[],
      loading:true
    };
    service = new Service();
  }

  assignrouts = () => {
    this.props.navigation.navigate('assignroute')
  }

  Logout =()=>{
    AsyncStorage.setItem("userID","");
    service.saveUserData('user', "");
    this.props.navigation.navigate('loginScreen')
  }

  render() {
    return (
      <View style={{backgroundColor:"white",flex:1}}>
<View style={{width:"100%",height:"30%",backgroundColor:"white",opacity:1.0}}>
<ImageBackground source={require('../Images/menu_main_img.png')} style={{width:"100%",height:"100%",justifyContent:"center"}}>
<View style={{backgroundColor:"transparent",flexDirection:"row"}}>
<Image source={require('../Images/user_menu.png')} style={{width:80,height:80,borderRadius:40,marginLeft:10}} />
<View style={{width:"60%",height:80,backgroundColor:"transparent",justifyContent:"center",marginLeft:10}}>
<Text style={{fontWeight:"bold",fontSize:18,color:"white"}}>Akash Jacob</Text>
<Text style={{marginTop:5,fontWeight:"600",fontSize:16,color:"white"}}>Akash@1wayit.com</Text>
</View>
</View>
</ImageBackground> 
</View>


<View style={{width:"100%",height:"70%",backgroundColor:"whites"}}>

<TouchableOpacity onPress={() => this.assignrouts()} style={{width:"100%",height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/route_menu.png')} style={{width:25,height:25,marginLeft:10}}  />
<Text style={{textAlign:"left",fontSize:18,marginLeft:25}}>Assigned Routes</Text>
<Image source={require('../Images/right_arrow.png')} style={{width:25,height:25,right:25,position:"absolute"}}  />
</TouchableOpacity>

<View style={{backgroundColor:"grey",width:"100%",height:1}}></View>

<TouchableOpacity style={{width:"100%",height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/profile_menu.png')} style={{width:25,height:25,marginLeft:10}}  />
<Text style={{textAlign:"left",fontSize:18,marginLeft:25}}>View Profile</Text>
<Image source={require('../Images/right_arrow.png')} style={{width:25,height:25,right:25,position:"absolute"}}  />
</TouchableOpacity>

<View style={{backgroundColor:"grey",width:"100%",height:1}}></View>

<TouchableOpacity style={{width:"100%",height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/settings_menu.png')} style={{width:25,height:25,marginLeft:10}}  />
<Text style={{textAlign:"left",fontSize:18,marginLeft:25}}>Settings</Text>
<Image source={require('../Images/right_arrow.png')} style={{width:25,height:25,right:25,position:"absolute"}}  />
</TouchableOpacity>

<View style={{backgroundColor:"grey",width:"100%",height:1}}></View>

<TouchableOpacity style={{width:"100%",height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/history.png')} style={{width:25,height:25,marginLeft:10}}  />
<Text style={{textAlign:"left",fontSize:18,marginLeft:25}}>History</Text>
<Image source={require('../Images/right_arrow.png')} style={{width:25,height:25,right:25,position:"absolute"}}  />
</TouchableOpacity>

<View style={{backgroundColor:"grey",width:"100%",height:1}}></View>

<TouchableOpacity   onPress={() => this.Logout()} style={{width:"100%",height:60,backgroundColor:"white",flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/logout_menu.png')} style={{width:25,height:25,marginLeft:10}}  />
<Text style={{textAlign:"left",fontSize:18,marginLeft:25}}>Logout</Text>
<Image source={require('../Images/right_arrow.png')} style={{width:25,height:25,right:25,position:"absolute"}}  />
</TouchableOpacity>

<View style={{backgroundColor:"grey",width:"100%",height:1}}></View>

</View>
      </View>
    );
  }
}
