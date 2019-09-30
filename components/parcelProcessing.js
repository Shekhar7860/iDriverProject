import React, { Component } from 'react';
import { View, Text,StatusBar,AsyncStorage ,Dimensions,ScrollView,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator, Image} from 'react-native';
const dimensions = {
fullHeight: Dimensions.get('window').height,
fullWidth: Dimensions.get('window').width
}
import {Container,Header,Title,Content,Button,Item,Label,Input,Body,Left,Right,Icon,Form,} from "native-base";
// import ImagePicker from 'react-native-image-picker';

// import { Dropdown } from 'react-native-material-dropdown';
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
<StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default class parcelProcessing extends Component {
constructor(props) {
super(props);
this.state = {
loading:true, 
comment:"",
status:false,
data: [ { "name": "TES-20190212-37251", "date": "12-02-2019", },

{"name": "Ebony Maw","date": "13-02-2019" ,},
{"name": "Ebony Maw","date": "13-02-2019" ,},



], 
dropStatus:false ,
dropArray:["Same Day Delivery - Delivered at door",
"Same Day Delivery - Delivered at a safe place",
"Same Day Delivery - Delivered to a neighbour"],
parcelimage : "",
signatureStr:""
};
}
componentDidMount(){





this.setState({loading:false});

}

componentWillReceiveProps(nextProps) {
AsyncStorage.getItem("signature").then((value) => {
console.log({"signature : ": value});

if (value == undefined || value == null){

this.setState({signatureStr:"" ,isLoading:false});

}else{

if (value == null){

}else{

this.setState({signatureStr:value ,isLoading:false,status:true});


}

}
}).done();

}
empty = () => {
return (
<View style={{height:30,width:dimensions.fullWidth,backgroundColor:"lightgery"}}/>
);
};



backaction(){
this.props.navigation.goBack()
}

dropAction(){

this.setState({dropStatus:!this.state.dropStatus})

}

tapFirst(index){

this.setState({dropStatus:false})

var ele = this.state.dropArray[0]
var ele2 = this.state.dropArray[index]

var start_index = 0
var number_of_elements_to_remove = 0;
var removed_elements = this.state.dropArray.splice(start_index, 1, ele2);
console.log(removed_elements);

var removed_elements2 = this.state.dropArray.splice(index, 1, ele);
console.log(removed_elements2);


}

signatureAction(){

this.props.navigation.navigate('sig') 
// this.setState({status:true})
}
cameraAction(){


ImagePicker.showImagePicker({title: "", maxWidth: 800, maxHeight: 600}, res => {
if (res.didCancel) {
console.log("User cancelled!");
} else if (res.error) {
console.log("Error", res.error);
} else {
console.log(res);
console.log(res.uri);

this.setState({parcelimage : res.uri})

this.setState({status:true})


}
});

// this.props.navigation.navigate('sig') 
// this.setState({status:true})
}
empty = () => {
return (
<View style={{height:20,width:dimensions.fullWidth,backgroundColor:"green"}}/>
);
};

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
<View style={{width:dimensions.fullWidth,height:dimensions.fullHeight,backgroundColor:"#E2E9E9",marginTop:0}}>
<MyStatusBar backgroundColor="#00659f" barStyle="light-content" />

<View style={{width:"100%",height:80,backgroundColor:"#34235a",flexDirection:"row"}}>
<TouchableOpacity onPress={() => this.backaction()} style={{width:60,height:70,alignItems:"center",justifyContent:"center"}}><Image style={{width:30,height:25,marginTop:35}} source={require('../Images/back.png')}/></TouchableOpacity>
<Text style={{color:"white",marginLeft:15,fontSize:20,fontWeight:"bold",alignSelf:"center",marginTop:25}}>Parcel Processing</Text>

</View>

<View style={{width:dimensions.fullWidth,height:dimensions.fullHeight - 80,backgroundColor:"transparent",}}>
<ScrollView>
<TouchableOpacity onPress={() => this.dropAction()} style={{backgroundColor:"white",width:"90%",height:50,marginLeft:"5%",marginTop:"5%"}}>
<Text style={{fontSize:15,marginTop:13,width:"80%",height:40,marginLeft:10}}>{this.state.dropArray[0]}</Text>
<Image source={require('../Images/down_arrow.png')} style={{width:20,height:15,position:"absolute",right:8,marginTop:16}}/>
</TouchableOpacity>
{ this.state.dropStatus == false ? null : <View style={{width:"90%",height:100,marginLeft:"5%",backgroundColor:"white",marginTop:10}}>
<TouchableOpacity onPress={() => this.tapFirst(1)} style={{width:"100%",height:"50%"}}>
<Text style={{fontSize:15,marginTop:15,width:"95%",height:40,marginLeft:5}}>{this.state.dropArray[1]}</Text>
<View style={{width:"100%",height:1,backgroundColor:"white",position:"absolute",bottom:0}}></View>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.tapFirst(2)} style={{width:"100%",height:"50%"}}>
<Text style={{fontSize:15,marginTop:15,width:"95%",height:40,marginLeft:5}}>{this.state.dropArray[2]}</Text>
<View style={{width:"100%",height:1,backgroundColor:"white",position:"absolute",bottom:0}}></View>
</TouchableOpacity>


</View> }
<View style={{width:"90%",flexDirection:"row",marginLeft:"5%",height:60,marginTop:5,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}}>
<Item floatingLabel style={{width:"95%",borderColor: 'transparent'}} >
<Label style={{color:"black",}}>Consignee Name</Label>
<Input getRef={(input) => { "Akash"}} autoCapitalize = "none" style={{color:"black"}} onChangeText={(text)=>this.setState({ comment:text})} />
</Item>
<Image source={require('../Images/edit.png')} style={{width:22,height:20,marginTop:8}}/>

</View>
<View style={{width:"90%",marginLeft:"5%",height:1,backgroundColor:"black",marginTop:-5}}></View>

<View style={{backgroundColor:"white",width:"90%",margin:"5%",height:80,flexDirection:"row",justifyContent:"center"}}>
<TouchableOpacity onPress={() => this.cameraAction()} style={{backgroundColor:"transparent",width:"33%",height:70,right:25,justifyContent:"center",alignItems:"center",marginTop:7}}>
<Image source={require('../Images/camera_new.png')} style={{width:45,height:45,marginTop:10}}/> 
<Text style={{margin:5}}>Take Picture</Text> 

</TouchableOpacity>

<TouchableOpacity onPress={() => this.signatureAction()} style={{backgroundColor:"transparent",width:"33%",height:70,left:25,justifyContent:"center",alignItems:"center",marginTop:7}}>

<Image source={require('../Images/contract.png')} style={{width:45,height:45,marginTop:10}}/> 
<Text style={{margin:5}}>Take Signature</Text> 

</TouchableOpacity>

</View>
{this.state.status == false ? null : <View style={{backgroundColor:"transparent",width:"90%",marginLeft:"5%",marginRight:"5%",height:90,flexDirection:"row",justifyContent:"center"}}>
<View style={{backgroundColor:"white",height:80,width:"25%",right:25,justifyContent:"center",alignItems:"center",borderWidth:1,borderRadius:6}}>
<Image source={{uri: this.state.parcelimage}} style={{width:"95%",height:"95%",margin:"5%"}} />
</View>
<View style={{backgroundColor:"white",height:80,width:"25%",left:35,justifyContent:"center",alignItems:"center"}}><Image source={{uri: this.state.signatureStr}} style={{width:"95%",height:"95%",margin:"5%"}} /></View>
</View>}

<Text style={{fontSize:20,width:"90%" ,paddingLeft:"5%",margin:5,fontWeight:"300"}}>ITEM DETAILS</Text>

<FlatList
data={this.state.data}
scrollEnabled={false}
// ListFooterComponent={this.empty()}
renderItem={({item,index}) => 
<View style={{marginTop:0}}>
<View style={{backgroundColor:"white",width:"90%",marginLeft:"5%",marginRight:"5%",height:90,flexDirection:"row",justifyContent:"center",borderBottomWidth:0.5,borderBottomColor:"black"}}>
<View style={{backgroundColor:"white",width:"60%",height:88}}>
<View style={{backgroundColor:"white",width:"100%",height:44,alignItems:"center",flexDirection:"row"}}>
<Image source={require('../Images/rectangular.png')} style={{width:22,height:20,margin:5,top:5}}/>
<Text style={{fontSize:15,fontWeight:"normal",marginLeft:10,color:"black",top:5}}>ICARGOS140054</Text>
</View>
<View style={{backgroundColor:"white",width:"100%",height:44,flexDirection:"row",alignItems:"center"}}>
<Image source={require('../Images/scale.png')} style={{width:20,height:20,margin:8}}/>
<Text style={{fontSize:15,fontWeight:"normal",marginLeft:8,color:"black"}}>1kg</Text>
<Image source={require('../Images/dimension.png')} style={{width:20,height:20,margin:8,left:5}}/>
<Text style={{fontSize:15,fontWeight:"normal",marginLeft:8,color:"black"}}>20 X 20 X 20</Text>
</View>

</View>
<View style={{backgroundColor:"white",width:"40%",height:88,alignItems:"center"}}>
<TouchableOpacity style={{backgroundColor:"#28323C",width:"80%",height:35,margin:8,borderRadius:50,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
<Image source={require('../Images/scan.png')} style={{width:22,height:20,margin:5, }}/>
<Text style={{fontSize:16,fontWeight:"normal", color:"white"}}>SCAN</Text>

</TouchableOpacity>
</View>

</View>

</View>
} 
/> 

<View style={{width:"90%",flexDirection:"row",marginLeft:"5%",height:60,marginTop:5,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}}>
<Item floatingLabel style={{width:"95%",borderColor: 'transparent'}} >
<Label style={{color:"black",}}>Your Comment</Label>
<Input getRef={(input) => { "Akash"}} autoCapitalize = "none" style={{color:"black"}} onChangeText={(text)=>this.setState({ comment:text})} />
</Item>
<Image source={require('../Images/edit.png')} style={{width:22,height:20,marginTop:8}}/>

</View>
<View style={{width:"90%",marginLeft:"5%",height:1,backgroundColor:"black",marginTop:-5}}></View>
<View style={{backgroundColor:"transparent",width:"90%",margin:"5%",height:80,flexDirection:"row",justifyContent:"center"}}>
<TouchableOpacity style={{backgroundColor:"white",width:"46%",right:10,height:53,justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize:14,fontWeight:"normal",color:"black"}}>CANCEL</Text>
</TouchableOpacity>
<TouchableOpacity style={{backgroundColor:"#ED4A47",width:"46%",left:10,height:53,justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize:14,fontWeight:"normal",color:"white"}}>SAVE</Text>
</TouchableOpacity>

</View>


</ScrollView>
</View>

</View>
</View>
);
}
}
const styles = StyleSheet.create({



});