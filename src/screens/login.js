import React, { Component } from "react";

import {
View,
Image,
Text,
StyleSheet,
TextInput,
KeyboardAvoidingView,
ImageBackground,
TouchableWithoutFeedback,
ScrollView,
AsyncStorage,Animated,Easing,
Alert
} from "react-native";
import { SocialIcon, Button, Icon} from 'react-native-elements';
import ElevatedView from 'react-native-elevated-view'
import Toast, {DURATION} from 'react-native-easy-toast'
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton,statusCodes,} from 'react-native-google-signin';
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PasswordInputView from '../screens/PasswordInputView';
import string from '../common/api'
const ACCESS_TOKEN='access_token';
class Login extends Component {
constructor(props){
super(props);
this.animatedValue3 = new Animated.Value(0)
this.state={
name:'',
password:'',
response:'',
user_name: '',
avatar_url: '',
avatar_show: false,
userInfo: '',
}
}

username(text){
this.setState({
username:text

})
}



password(text){
this.setState({
password:text

})
}
handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }

 componentDidMount() {
 this.animate()
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:'555594872553-svdbfth3t6rdvejujce26sqetu03oo24.apps.googleusercontent.com'
    });
  }
   _signIn = async () => {
      //Prompts a modal to let the user sign in into your application.
      try {
        await GoogleSignin.hasPlayServices({

          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info --> ', userInfo);
        this.setState({ userInfo: userInfo });
     ;
      } catch (error) {
        console.log('Message', error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signing In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play Services Not Available or Outdated');
        } else {
          console.log('Some Other Error Happened');
        }
      }
           this.props.navigation.navigate('Home')
    };
    _getCurrentUser = async () => {
      //May be called eg. in the componentDidMount of your main component.
      //This method returns the current user
      //if they already signed in and null otherwise.
      try {
        const userInfo = await GoogleSignin.signInSilently();
        this.setState({ userInfo });
      } catch (error) {
        console.error(error);
      }
    };
    _signOut = async () => {
      //Remove user session from the device.
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.setState({ user: null }); // Remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };
    _revokeAccess = async () => {
      //Remove your application from the user authorized applications.
      try {
        await GoogleSignin.revokeAccess();
        console.log('deleted');
      } catch (error) {
        console.error(error);
      }
    };
signup()
{
let collection={
username:this.state.username,
password:this.state.password,
device_id:DeviceInfo.getUniqueID()
}
var url = string.HTTP+'/check_logins';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json'
})
})

.then((response) => response.json())
.then((responseJson) => {
if(responseJson.res==1){
this.refs.toast.show('Login success',DURATION.LENGTH_LONG);
this.props.navigation.navigate('Home');
this.storeToken(accessToken)
}
else
this.refs.toast.show('Invalid credentials',DURATION.LENGTH_LONG);
})
}
onClick(){
this.signup();
}
animate () {
  this.animatedValue3.setValue(0)
  const createAnimation = function (value, duration, easing, delay = 0) {
    return Animated.timing(
      value,
      {
        toValue: 1,
        duration,
        easing,
        delay
      }
    )
  }
  Animated.parallel([
    createAnimation(this.animatedValue3, 1000, Easing.ease)
  ]).start()
}
 handlePassword = (password) => {
        let newState = this.state
        newState.password = password
        this.setState(newState)
    }

render() {
const keyboardVerticalOffset = Platform.OS === 'android' ? 40 : 0
const introButton = this.animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-130,3]
  })
return (

<View style={styles.container}>
<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
<Text style={{fontSize:hp('3%'),fontWeight: 'bold',color: 'black' ,marginTop:50,marginBottom:40}}>Login to your account
</Text>

<View style={{flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
<SocialIcon
        style={{width:wp('45%')}}
        fontStyle={{fontSize:hp('2%')}}
        onPress={this.handleFacebookLogin}
        title="Continue with fb"
        button
        type="facebook"
        color="#4267B2"
      />


< SocialIcon
           style={{ width:wp('45%')}}
           fontStyle={{fontSize:hp('2%')}}
           title="Continue with G+"
           button
           type="google-plus-official"
            color="white"
          onPress={this._signIn}
        />

</View>
<Text style={{fontWeight: 'bold', marginTop:7,marginBottom:13,textAlign:"center"}}>or</Text>

<ElevatedView elevation={7} style={styles.con} >
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',marginTop:10}}>
<Icon name='user' type='entypo' iconStyle={{marginTop:15,marginLeft:20,marginRight:10}}/>
<TextInput style={styles.input}
placeholder = "Full Name"
autoCapitalize = "none"
value={this.props.username}
onChangeText={(text)=>this.username(text,'username')}
/>
</View>
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',margin:16}}>
<PasswordInputView
   ref={passwordView => { this.passwordView = passwordView }}
    callback={this.handlePassword}
    label={'Password'} />
</View>
<Text style={{color:"red", fontSize:hp('2.5%'),marginLeft:150,textDecorationLine: 'underline'}}>forgot password</Text>
<View style={{alignItems:'center',marginLeft:10}}>
<Button

onPress={()=>{this.onClick()}}
buttonStyle={{marginRight:20,backgroundColor:"#daa520", width:wp('40%'),marginTop:15}}
title="LOGIN"
titleStyle={{fontSize:hp('2%')}}
/>
<Toast ref="toast"/>
 <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SignUp')}>
<Text style={{fontSize:hp('2.5%'),fontWeight:'bold',marginTop:20,marginBottom:20,marginRight:20}}>Not User?{" "}

<Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'red',textDecorationLine: 'underline'}}>SIGNUP</Text></Text>
</TouchableWithoutFeedback>
</View>
</ElevatedView>
 </KeyboardAvoidingView>
</View>

);
}
}



export default Login;

const styles = StyleSheet.create({
container: {
flex:1.2,
alignItems:"center"
},
input: {
width:wp('70%'),
color:'black',
fontSize:hp('2.3%'),
marginTop:10
},
con:{
marginLeft:5,
borderRadius:20,
width:wp('95%'),
alignItems:"center",

},
 text: {
    color: '#000',
    textAlign: 'center',
    padding: 20
  },


});