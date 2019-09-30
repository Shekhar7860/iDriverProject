import React, { Component } from 'react';
import { View,Alert,Platform,AsyncStorage,PermissionsAndroid, Text ,StyleSheet,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width
const dimensions = {
fullHeight: Dimensions.get('window').height,
fullWidth: Dimensions.get('window').width
}
export default class addSignature extends Component {
constructor(props) {
super(props);
this.state = {
userId:"",
ref:"",
isLoading:false,
isLoad:false
};
}

componentDidMount(){
if (Platform.OS === "ios") {

}else{

this.per();


}
console.log('working')


}


async per(){

try {
const granted = await PermissionsAndroid.request(
PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
{
'title': 'Capturing Signature',
'message': 'Allow app to save signature image'
}
)
if (granted === PermissionsAndroid.RESULTS.GRANTED) {
console.log("permission granted")
} 
else {
console.log("Image permission denied")
}
} catch (err) {
console.warn(err)
}

}

gobackAction=()=>{


this.props.navigation.goBack()

}

saveAction=()=>{
alert('this one')

// this.setState({isLoad:true});

// this.saveNewOne();

}

saveNewOne=()=>{

this.refs["sign"].saveImage();

// setTimeout( () => {
// this.backCall();
// },10000);

}


saveSign() {
// this.refs["sign"].saveImage();
}

resetSign() {
this.refs["sign"].resetImage();
}

// _onSaveEvent=(result)=> {
// //result.encoded - for the base64 encoded png
// //result.pathName - for the file path name
// console.log(result.pathName);
// this.loginFunction(result)
// //this._onSaveEventNew(result);
// //this.hdud("dude");
// }

hdud=(d)=>{
console.log(d);


}

getdata = (val) =>{
alert(JSON.stringify(val))
}


// async loginFunction(result) {

// var data = {
// image: 'data:image/png;base64,' + result.encoded,
// };
// try {
// let response = await fetch(
// "http://cashmann.co.uk/shekhar/ionic3upload.php",
// {
// method: "POST",
// headers: {
// "Accept": "application/json",
// "Content-Type": "application/json"
// },
// body: JSON.stringify(data)
// }
// );

// if (response.status >= 200 && response.status < 300) {

// Alert.alert("Alert","Invalid" );


// }else {

// Alert.alert("Alert","Invalid email or password!" );

// }
// } catch (errors) {

// this.setState({isLoading:false});

// Alert.alert("Alert","Please Check your internet connection" );
// }
// }


_onSaveEvent=(result)=>{
//https://greenleafairquotes.com/dev/api/upload-image
console.log('result', result)

this.setState({isLoad:true})

var pat = "";

if (Platform.OS === "ios") {

pat = result.pathName;

}else{

pat = "file://" + result.pathName;

}
AsyncStorage.setItem("signature",pat);

// this.props.navigation.goBack()
this.props.navigation.navigate('parcelprocess', {
onGoBack: () => this.refresh(),
});

// var photo = {
// uri: pat,
// type: 'multipart/form-data',
// name: "signature.png"
// };

// var body = new FormData();

// body.append('data_name', photo);


// fetch('https://greenleafairquotes.com/dev/api/uploadImage',
// {
// method: "POST",
// headers: {
// 'Content-Type': 'multipart/form-data'
// },
// body: body
// }).then((response) => {
// console.log("early response here:",response);
// response.json().then((res) => {
// console.log("local", res);

// AsyncStorage.setItem("sig1",res.data.image_ref);

// this.backCall();


// }, (error) => {
// console.log(error) //Display error
// });
// }

// )
// .catch((error) => {
// console.error(error);
// });


}


checkFunction = (res) => {
res.json().then((response) => {
console.log('test', response)
})
}

newAction=()=>{


// this.props.navigation.navigate('homeScreen', {
// onGoBack: () => this.refresh(),
// });
}
backCall=()=>{
this.setState({isLoading:false,isLoad:false});
Alert.alert(
'Success!',
'Signature saved successfully.',
[
{text: 'OK', onPress: () => this.newAction()},
],
{ cancelable: false }
)

}

myNewFunction = (res) => {
console.log(res)

}
_onDragEvent() {
// This callback will be called when the user enters signature
console.log("dragged");
}



render() {
if(this.state.isLoading){
return(
<View style={{flex: 1,alignItems:"center",justifyContent:"center",backgroundColor:"#0070aa"}}>
</View>
)
}
return (
<View style={styles.container}><View style={{backgroundColor:"#34235a",width:fullWidth,height:80,marginLeft:0,marginTop:0,flexDirection:"row"}}>
<TouchableOpacity onPress = {this.gobackAction} style={{width:50,height:50,marginLeft:0,alignItems:"center",justifyContent:"center",top:28}}><Image style={{marginLeft:-10,width:20,height:15}}
source = {require('../Images/back.png')} 
/></TouchableOpacity>
<Text style={{color:"white",width:150,alignSelf:"center",top:15,marginLeft:fullWidth/2 - 133 , textAlign:"center",fontSize:20,fontWeight:"bold"}}>Add Signature</Text>
<TouchableOpacity onPress = {this.saveNewOne} style={{width:50,height:50,marginLeft:fullWidth/2 - 75 - 50,alignItems:"center",justifyContent:"center",top:28}}><Image style={{marginLeft:-10,width:20,height:15}}
source = {require('../Images/save.png')} 
/></TouchableOpacity>
</View>


<View style={{backgroundColor:"white",width:fullWidth,height:fullHeight-100,marginTop:0}}>
{ this.state.isLoad == true ? <View style={{width:dimensions.fullWidth ,height:50,backgroundColor:"#eff5f9",alignItems:"center",justifyContent:"center"}}><Text>Saving Image Please wait...</Text></View> : null }
<SignatureCapture
style={[{flex:1},styles.signature]}
ref="sign"
onSaveEvent={this._onSaveEvent}
onDragEvent={this._onDragEvent}
saveImageFileInExtStorage={true}
showNativeButtons={false}
showTitleLabel={false}
viewMode={"portrait"}/>
</View>


</View>

);
}
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"white"

},
signature: {
flex: 1,
borderColor: '#000033',
borderWidth: 1,
},



});