import React, {Fragment,Component} from 'react';
import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Text,
StatusBar,
Dimensions,
AsyncStorage
} from 'react-native';

import {
Header,
LearnMoreLinks,
Colors,
DebugInstructions,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import login from './components/login';
import home from './components/home'
import SideBar from './components/SideBar'
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import mapv from './components/mappv';
import assignedRoute from './components/assignedRoute';
import { createAppContainer } from 'react-navigation';
import detail from './components/detail';
// import parcelProcessing from './components/parcelProcessing';
// import addSignature from './components/addSignature'
const dimensions = {
fullHeight: Dimensions.get('window').height,
fullWidth: Dimensions.get('window').width
}


const customerRoot = createStackNavigator(
{
custHome: {
screen: home
},
assignroute: {
screen: assignedRoute
},
mapView: {
screen: mapv
}, 
viewdetail:{
screen:detail
},
// parcelprocess: {
// screen: parcelProcessing
// },
// sig: {
// screen: addSignature
// },
},
{
initialRouteName: 'custHome',
headerMode: 'none'

}

);
const HomeScreenRouter = createDrawerNavigator(
{
customerHome: { screen: customerRoot,
},

},
{
contentComponent: SideBar,
drawerWidth:dimensions.fullWidth/4 * 3 ,
drawerPosition : 'left',
drawerOpenRoute: 'DrawerRightOpen',
drawerCloseRoute: 'DrawerRightClose',
drawerToggleRoute: 'DrawerRightToggle',
}
);

const loginPageStackNew = createStackNavigator(
{
loginScreen: {
screen: login
},
homeScreen: {
screen: HomeScreenRouter
},
mapView: {
screen: mapv
},
assignroute: {
screen: assignedRoute
},

viewdetail:{
screen:detail
},
// parcelprocess: {
// screen: parcelProcessing
// },
},
{
initialRouteName: "loginScreen",
headerMode: 'none',

}
);

const loginPageStackNewAfterLogin = createStackNavigator(
{
loginScreen: {
screen: login
},
homeScreen: {
screen: HomeScreenRouter
}
},
{
initialRouteName: "homeScreen",
headerMode: 'none',

}
);

const App1 = createAppContainer(loginPageStackNew);
const App2 = createAppContainer(loginPageStackNewAfterLogin);

export default class App extends Component{



constructor(props){
super(props);



this.state = { 
email:'newcustomer@gmail.com',
password:'123456',
isLoading: true,
isLoad:false,
scr : "WelcomeScreen"


}
}
componentDidMount(){
// AsyncStorage.setItem("userID", "")
AsyncStorage.getItem("userID").then((value) => {
console.log({"userID : ": value});

if (value == undefined || value == null){

this.setState({user_Id:"" ,isLoading:false});

}else{

if (value == null){

}else{

this.setState({user_Id:value ,isLoading:false});


}

}
}).done();


}



render() {

if(this.state.isLoading){
return(
<View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>

</View>
)
}



if (this.state.user_Id == "" || this.state.user_Id == null){


return (

<App1 />
);

}else{


return (

<App2 />
);

}
}

}
const styles = StyleSheet.create({
scrollView: {
backgroundColor: Colors.lighter,
},
engine: {
position: 'absolute',
right: 0,
},
body: {
backgroundColor: Colors.white,
},
sectionContainer: {
marginTop: 32,
paddingHorizontal: 24,
},
sectionTitle: {
fontSize: 24,
fontWeight: '600',
color: Colors.black,
},
sectionDescription: {
marginTop: 8,
fontSize: 18,
fontWeight: '400',
color: Colors.dark,
},
highlight: {
fontWeight: '700',
},
footer: {
color: Colors.dark,
fontSize: 12,
fontWeight: '600',
padding: 4,
paddingRight: 12,
textAlign: 'right',
},
});