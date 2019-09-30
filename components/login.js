import React, { Component } from 'react';
import { View,Alert, Text,TextInput,KeyboardAvoidingView, Button, AsyncStorage ,ImageBackground,Image ,Dimensions, TouchableOpacity } from 'react-native';
import Service from '../services/Service';
 import firebase  from 'react-native-firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import Communications from 'react-native-communications';
import base64 from 'react-native-base64'
var jwtDecode = require('jwt-decode');
// import Database from './Database';
// const db = new Database();
const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      message : "",
      showAlert : false,
      firstDrop : "",
      secondDrop : "",
      thirdDrop : ""
    };

    service = new Service();
  }


  // componentDidMount = () => {
  //   alert('m working')
   
  // }
  success = (res) => {
 console.log('mysuccessresponse', res)

 service.login(this.state.email, this.state.password).then((res) => {
  // console.log('response', res)


  console.log(this.parseJwt(res))
  var userResponse = this.parseJwt(res);
  console.log(userResponse);
  service.saveUserData("user", userResponse);
  console.log(userResponse.accessToken)
 
 this.setState({message : 'login successfully'})
  this.showAlert()
 setTimeout(() => {
  this.hideAlert()
  this.props.navigation.navigate('homeScreen')
 }, 1000)
  // let data = {
  //   accessToken: userResponse.accessToken,
  //  driver_code: userResponse.user_detail.code,
  //   picture: userResponse.user_detail.picture,
  //   primary_email: userResponse.user_detail.email,
  //   password: userResponse.password,
  //   name : userResponse.user_detail.personName,
  //   user_id : userResponse.user_detail.user_id,
  //   staff : userResponse.isStaff,
  //   firebase_user_id : userResponse.uid,
  //   vehicle_code :userResponse.vehicle.code,
  //   vehicle_type : userResponse.vehicle.vehicleTypeName,
  //   login_status : 1 ,
  //   firebase_connection_status : 1
  // }
  // db.addProduct(data).then((result) => {
  //   console.log(result);
  //   this.setState({
  //     isLoading: false,
  //   });
  //   this.props.navigation.state.params.onNavigateBack;
  //   this.props.navigation.goBack();
  // }).catch((err) => {
  //   console.log(err);
  //   this.setState({
  //     isLoading: false,
  //   });
  // })
  


})
 
 
  }

  

  parseJwt = (token) =>  {
    var decoded = jwtDecode(token);
console.log(decoded);
    // var base64Url = token.split('.')[1];
    // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    // }).join(''));

    return decoded
};

  error = (err) => {
    console.log('got error', err)
    this.setState({message : 'wrong email or password'})
     this.showAlert()
     setTimeout(() => {
      this.hideAlert()
     
     }, 1000)
    
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
    
  };
 

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };


  homeAction(){
   
    // Communications.text('0123456789', 'Test Text Here')
    if (this.state.email == ""){
      Alert.alert("Enter email")
    }else if (this.state.password == ""){
      Alert.alert("Enter password")

    }else if(this.validate(this.state.email) == false){
      Alert.alert("Enter valid email")

    }else{
      AsyncStorage.setItem("userID","1");
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => this.success(res))
      .catch(error => this.error(error))
    
    }

    


  }


  componentDidMount = () => 
{
  
  firebase.messaging().getToken().then((token) => {
 // alert( token)
 });
}
  // homeAction(){

  //   this.props.navigation.navigate('homeScreen')


  // }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({email:text})
    return false;
      }
    else {
      this.setState({email:text})
      console.log("Email is Correct");
    }
    }

  render() {
    const {showAlert} = this.state;
    return (
      <KeyboardAvoidingView style={{backgroundColor:"white",flex:1}} behavior="position" enabled   keyboardVerticalOffset={-200}>
     <View style ={{width:dimensions.fullWidth,height:dimensions.fullHeight/3}}><Image source={require('../Images/mainlogin.png')} style={{width:dimensions.fullWidth,height:dimensions.fullHeight/3}}/></View>
   
        <View style={{backgroundColor:"white",width:dimensions.fullWidth , height:300,alignItems:"center" }}>
          <Text style={{fontSize:25,fontWeight:"bold",color:"#34235a"}}>Welcome to iDriver</Text>
          <View style={{width:dimensions.fullWidth - 40 ,height:50 , borderColor:"black",borderWidth:1,borderRadius:25,marginTop:20,justifyContent:"center"}}>
          <TextInput 
           autoCapitalize = "none"
          onChangeText={(text)=>this.setState({ email:text})}
           style={{fontSize:16,color:"black",width:"90%",marginLeft:"5%",paddingTop:5}}
           placeholder="Email Address"
           value = {this.state.email}
           placeholderTextColor="#606465"
           editable = {true}
           blurOnSubmit={true}
           onSubmitEditing={() => { this.secondTextInput.focus(); }}
           returnKeyType = { "next" }

           />

          </View>


          <View style={{width:dimensions.fullWidth - 40 ,height:50 , borderColor:"black",borderWidth:1,borderRadius:25,marginTop:20,justifyContent:"center"}}>
          <TextInput 
           autoCapitalize = "none"
          onChangeText={(text)=>this.setState({ password:text})}
           style={{fontSize:16,color:"black",width:"90%",marginLeft:"5%",paddingTop:5}}
           placeholder="Password"
           value = {this.state.password}
           placeholderTextColor="#606465"
           editable = {true}
           blurOnSubmit={true}
           ref={(input) => { this.secondTextInput = input; }}

           />

          </View>


         <TouchableOpacity    onPress={() => this.homeAction()}   style={{backgroundColor:"#34235a",width:200,height:50,borderRadius:25,marginTop:20,justifyContent:"center"}}><Text style={{alignSelf:"center",fontSize:18,color:"white"}}>Login</Text></TouchableOpacity>
       

        </View>
        <AwesomeAlert
        style={{backgroundColor : 'white'}}
          show={showAlert}
          showProgress={true}
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
        />
        {/* <TouchableOpacity onPress={() => this.homeAction()}><Text style={{color:"green"}}>login </Text></TouchableOpacity> */}
      </KeyboardAvoidingView>
    );
  }
}
