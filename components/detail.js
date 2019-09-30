import React, { Component } from 'react';
import { View, Text ,Dimensions,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator, Image, Linking} from 'react-native';
const dimensions = {
fullHeight: Dimensions.get('window').height,
fullWidth: Dimensions.get('window').width
}

import Communications from 'react-native-communications';
export default class detail extends Component {
constructor(props) {
super(props);
this.state = {
loading:true, 
newarrays:[],
data: [ { "name": "TES-20190212-37251", "date": "12-02-2019", },
{"name": "Ebony Maw","date": "13-02-2019" ,},
{"name": "Black Dwarf","date": "14-02-2019", },
{"name": "Mad Titan","date": "15-02-2019", },
],
details : []

};
}
componentDidMount(){
  Communications.phonecall('0123456789', true)
if(this.props.navigation.state.params)
{

console.log(this.props.navigation.state.params.details.s_drops, 'details')
var drops = this.props.navigation.state.params.details.s_drops
var arr = []
for (i in drops) {
console.log(drops[i])
arr.push(drops[i])
}
console.log(arr, 'arr')
this.setState({details : arr})
// let items = Object.values(this.props.navigation.state.params);
// console.log('itemms', items)
// this.setState({data : this.props.navigation.state.params.details})
}
for(var i=0; i<=this.state.data.length;i++){
this.state.newarrays.push({"stat":"open"}) 

}


console.log("newarray",this.state.newarrays[0].stat)


this.setState({loading:false});

}


empty = () => {
return (
<View style={{height:20,width:dimensions.fullWidth,backgroundColor:"#E7EBEE"}}/>
);
};
backaction(){
this.props.navigation.goBack()
}

// call = (number) => {
// console.log('num', number)
// // Linking.openURL(`tel:${number}`)
// }
ShowHideTextComponentView = (items,indexs) =>{


if(this.state.newarrays[indexs].stat == "open"){

console.log("0")
this.state.newarrays[indexs].stat = "close"
}else{

this.state.newarrays[indexs].stat = "open"
console.log("open")

}
this.setState({loading:false});

console.log("getarray",this.state.newarrays)


}
process(){
this.props.navigation.navigate('parcelprocess')
}

call = (add, identity) => {
var phoneArray = []
for (obj in add){
console.log(add[obj])
phoneArray.push(add[obj])
}
console.log( phoneArray, 'as')
console.log('jjs', phoneArray[0].shipment_customer_phone)
 Communications.phonecall(phoneArray[0].shipment_customer_phone, true)

// Linking.openURL(`tel:${phoneArray[0].shipment_customer_phone}`)
}


makeText = (add, identity) => {
var phoneArray = []
for (obj in add){
console.log(add[obj])
phoneArray.push(add[obj])
}
console.log( phoneArray, 'as')
console.log('jjs', phoneArray[0].shipment_customer_phone)
Communications.text(phoneArray[0].shipment_customer_phone, 'Type Text Here') 
// Linking.openURL(`tel:${phoneArray[0].shipment_customer_phone}`)
}

renderAddress = (add, identity) => {
var addressArray = []
for (obj in add){
console.log(add[obj])
addressArray.push(add[obj])
}
console.log(addressArray, 'as')
return addressArray[0].shipment_customer_name + '/' + addressArray[0].shipment_companyName
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
<View style={{width:dimensions.fullWidth,height:dimensions.fullHeight,backgroundColor:"#E7EBEE",marginTop:0}}>
<View style={{backgroundColor:"#332259",width:dimensions.fullWidth,height:100,flexDirection:"row",alignItems:"center"}}>
<TouchableOpacity onPress={() => this.backaction()} style={{backgroundColor:"#332259",width:50,height:60,marginTop:35,marginLeft:5,alignItems:"center",justifyContent:"center"}}>
<Image source={require("../Images/back.png")} style={{height:20,width:25,tintColor:"white"}}/>

</TouchableOpacity>
<View style={{backgroundColor:"#332259",width:dimensions.fullWidth-55,height:60,marginTop:35,justifyContent:"center"}}>
<Text style={{marginLeft:15,fontSize:20,fontWeight:"normal",color:"white"}}>{this.props.navigation.state.params.details.name}</Text>
</View>
</View>


<FlatList
data={this.state.details}
//extraData={this.state}
ListFooterComponent={this.empty()}
renderItem={({item,index}) => 
<View>
<View style={{backgroundColor:"white",width:dimensions.fullWidth-20,height:230,marginLeft:10,marginTop:10,borderTopLeftRadius:6,borderTopRightRadius:6,borderBottomRightRadius:this.state.newarrays[index].stat == "close" ? 6:null,borderBottomLeftRadius:this.state.newarrays[index].stat == "close" ? 6:null}}>
<View style={{backgroundColor:"white",width:"100%",height:"27%",flexDirection:"row",borderTopLeftRadius:6,borderTopRightRadius:6,borderBottomRightRadius:this.state.newarrays[index].stat == "close" ? 6:null,borderBottomLeftRadius:this.state.newarrays[index].stat == "close" ? 6:null}}>
<View style={{backgroundColor:"#545A5A",height:"100%",width:"20%",justifyContent:"center",alignItems:"center",borderTopLeftRadius:6}}><Text style={{fontSize:22,fontWeight:"normal",color:"white"}}>{index+1}</Text></View>
<View style={{backgroundColor:"white",height:"100%",width:"30%",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:20,fontWeight:"normal",color:"#545A5A"}}>{item.postcode}</Text></View>
<View style={{backgroundColor:"white",height:"100%",width:"50%",borderTopRightRadius:6}}>
<View style={{backgroundColor:"#ED4A47",width:"100%",height:"50%",justifyContent:"center",alignItems:"center",borderTopRightRadius:6}}><Text style={{color:"white",fontSize:14,fontWeight:"normal"}}>Service Time : {item.service_starttime}</Text></View>
<View style={{backgroundColor:"#545A5A",width:"100%",height:"50%",justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:14,fontWeight:"normal"}}>ETA :--</Text></View>

</View>
</View>
<View style={{backgroundColor:"white",width:"100%",height:"73%",flexDirection:"row",borderBottomRightRadius:this.state.newarrays[index].stat == "close" ? 6:null,borderBottomLeftRadius:this.state.newarrays[index].stat ? 6:null}}>
<View style={{backgroundColor:"white",height:"100%",width:"85%",borderBottomLeftRadius:this.state.newarrays[index].stat == "close" ? 6:null}}>
<View style={{backgroundColor:"white",height:"40%",width:"100%",flexDirection:"row"}}><Image source={require("../Images/Maps.png")} style={{height:25,width:25,tintColor:"#545A5A",marginLeft:3,marginTop:5}}/><Text style={{marginLeft:2,fontSize:20,marginTop:5,color:"#34235a"}}>{this.renderAddress(item.shipments, item.instaDispatch_objectIdentity)}</Text></View>
<View style={{backgroundColor:"white",height:"20%",width:"100%",flexDirection:"row",alignItems:"center"}}>
<Image source={require("../Images/d_char.png")} style={{height:18,width:18,marginLeft:5,}}/><Text style={{marginLeft:5,fontSize:18,color:"#545A5A",fontWeight:"normal"}}>{item.shipment_address1}, {item.shipment_address2}</Text>
</View>

<View style={{backgroundColor:"white",height:"20%",width:"100%",flexDirection:"row",alignItems:"center"}}>
<Image source={require("../Images/parcel.png")} style={{height:18,width:18,marginLeft:6, }}/><Text style={{marginLeft:5,fontSize:18,color:"#545A5A",fontWeight:'normal'}}>{item.instaDispatch_objectIdentity}</Text>

</View>
<View style={{backgroundColor:"white",height:"20%",width:"100%",justifyContent:"center",borderBottomLeftRadius:this.state.newarrays[index].stat == "close" ? 6:null}}><Image source={require("../Images/info_icon.png")} style={{height:18,width:18,marginLeft:7,}}/></View>

</View>
<View style={{backgroundColor:"white",height:"100%",width:"15%",borderBottomRightRadius:this.state.newarrays[index].stat == "close" ? 6:null}}>
<TouchableOpacity onPress={() => this.ShowHideTextComponentView(item,index)} style={{backgroundColor:"white",width:"100%",height:"30%",alignItems:"center",justifyContent:"center",marginTop:100}}>
{this.state.newarrays[index].stat == "close" ? <Image source={require("../Images/down_arrow.png")} style={{height:25,width:25,tintColor:"#332259"}}/>:<Image source={require("../Images/up_arrow.png")} style={{height:25,width:25,}}/>}

</TouchableOpacity>
</View>
</View>

</View>
{this.state.newarrays[index].stat == "open" ? <View style={{backgroundColor:"white",width:dimensions.fullWidth-20,height:120,borderTopColor:"black",borderTopWidth:0.5,alignItems:"center",marginLeft:10,borderBottomLeftRadius:6,borderBottomRightRadius:6}}>
<View style={{backgroundColor:"white",width:"100%",height:"50%",flexDirection:"row",alignItems:"center",justifyContent:"center", }}>
<TouchableOpacity onPress={() => this.call(item.shipments, item.instaDispatch_objectIdentity)} style={{backgroundColor:"#28323C",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><Image source={require("../Images/call_answer.png")} style={{height:25,width:25,}}/><Text style={{marginLeft:5,color:"white"}}>CALL</Text></TouchableOpacity>
<TouchableOpacity style={{backgroundColor:"#28323C",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><Image source={require("../Images/navigation.png")} style={{height:25,width:25, }}/><Text style={{marginLeft:5,color:"white"}}>NAV</Text></TouchableOpacity>
<TouchableOpacity onPress={() => this.makeText(item.shipments, item.instaDispatch_objectIdentity)} style={{backgroundColor:"#28323C",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><Image source={require("../Images/conversation.png")} style={{height:25,width:25, }}/><Text style={{marginLeft:5,color:"white"}}>TEXT</Text></TouchableOpacity>

</View>
<View style={{backgroundColor:"white",width:"100%",height:"50%",flexDirection:"row",justifyContent:"center",borderBottomLeftRadius:6,borderBottomRightRadius:6}}>
<TouchableOpacity onPress={() => this.process()} style={{backgroundColor:"#28323C",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><Image source={require("../Images/success.png")} style={{height:25,width:25, }}/><Text style={{marginLeft:5,color:"white"}}>DELIVER</Text></TouchableOpacity>
<TouchableOpacity style={{backgroundColor:"#28323C",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2,alignItems:"center",justifyContent:"center",flexDirection:"row"}}><Image source={require("../Images/business_card.png")} style={{height:25,width:25, }}/><Text style={{marginLeft:5,color:"white"}}>CARDED</Text></TouchableOpacity>
<View style={{backgroundColor:"transparent",height:"60%",width:(dimensions.fullWidth-20)/4+20,margin:3,borderRadius:((dimensions.fullWidth-20)/4+20)/2}}></View>

</View>

</View>:null}
</View>
}

/>



</View>
</View>
);
}
}
const styles = StyleSheet.create({



});