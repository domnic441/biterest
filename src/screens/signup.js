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
Alert
} from "react-native";
import { SocialIcon, Button, Icon} from 'react-native-elements';
import ElevatedView from 'react-native-elevated-view'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton,statusCodes,} from 'react-native-google-signin';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
class SignUp extends Component {
constructor(props){
super(props);
this.state={
name:'',
email:'',
mobile:'',
password:'',
response:''
}
}

name(text){
this.setState({
name:text

})
}

email(text){
this.setState({
email:text

})
}
mobile(text){
this.setState({
mobile:text

})
}

password(text){
this.setState({
password:text

})
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
    initUser(token) {
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        user.name = json.name
        user.id = json.id
        user.user_friends = json.friends
        user.email = json.email
        user.username = json.name
        user.loading = false
        user.loggedIn = true
        user.avatar = setAvatar(json.id)
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK')
      })
    }
signup()
{

let collection={
name:this.state.name,
email:this.state.email,
mobile:this.state.mobile,
password:this.state.password
}
var url = string.HTTP+'/create_hotel';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json'
})
}).then((response) => response.json())
.then((responseJson) => {
if(responseJson.res==1){
Alert.alert('You created account Successfully');
this.props.navigation.navigate('Login');
}
else
Alert.alert('Email or Mobile already Exists');
})
}

render() {
return (

<View style={styles.container}>
<View style={{flexDirection:"column",alignItems:'flex-start',marginRight:220}}>
<Icon name="keyboard-backspace" size={30} type='materialCommunity' iconStyle={{color:'black'}} onPress={() => this.props.navigation.navigate('Login')}/>
<Text style={{fontSize:hp('2.5%'),fontWeight: 'bold',color: 'black',marginBottom:20}}>Get Started Now{"\n"}to Feast your hunger.</Text>
</View>
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


<ElevatedView elevation={7} style={styles.con}>
<ScrollView>
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',margin:5}}>
<Icon name='user' type='entypo' iconStyle={{marginTop:15,marginRight:10}}/>
<TextInput style={styles.input}
placeholder = "Full Name"
autoCapitalize = "none"
value={this.props.name}
onChangeText={(text)=>this.name(text,'name')}
/>
</View>
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',margin:5}}>
<Icon name='mail' type='entypo' iconStyle={{marginTop:15,marginRight:10}}/>
<TextInput style={styles.input}
placeholder = "Email"
autoCapitalize = "none"
value={this.props.email}
onChangeText={(text)=>this.email(text,'email')}
/>
</View>
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',margin:5}}>
<Icon name='mobile' type='entypo' iconStyle={{marginTop:15,marginRight:10}}/>
<TextInput style={styles.input}
placeholder = "10 digit number"
autoCapitalize = "none"
value={this.props.number}
onChangeText={(text)=>this.mobile(text,'mobile')}
/>
</View>
<View style={{flexDirection:'row',borderBottomWidth:2,borderBottomColor:'black',margin:5}}>
<Icon name='key' type='entypo' iconStyle={{marginTop:15,marginRight:10}}/>
<TextInput style={styles.input}
placeholder = "Password"
autoCapitalize = "none"
value={this.props.pass}
onChangeText={(text)=>this.password(text,'password')}
/>
</View>
<Text style={{color:"red", fontSize:hp('2.3%')}}>{this.state.Error}</Text>
<View style={{alignItems:'center'}}>
<Button
onPress={()=>this.signup()}
buttonStyle={{backgroundColor:"#daa520", width:wp('40%'),marginTop:10,}}
titleStyle={{fontSize:hp('2%')}}
title="CREATE ACCOUNT"
/>

<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Login')}>
<Text style={{fontSize:hp('2.3%'),marginTop:20,marginBottom:20,color:'black'}}>Existing User?{" "}

<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'red',textDecorationLine: 'underline'}}>SignIn</Text></Text>
</TouchableWithoutFeedback>
</View>
</ScrollView>
</ElevatedView>

</View>

);
}
}



export default SignUp;

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems:'center'


},
input: {
width:wp('70%'),
fontSize:hp('2.3%')
},
con:{
borderRadius:20,
width:wp('95%'),
alignItems:"center",
justifyContent:"center",
}

});