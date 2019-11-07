import React, { Component } from "react";
import {
View,
Text,
StyleSheet,
TextInput,
TouchableOpacity,
TouchableWithoutFeedback
} from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast'
import DeviceInfo from 'react-native-device-info';
import string from '../common/api'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
class Issue extends Component{
constructor()
{
super();
this.state={
question:'',
hotel_id:"",
isModalVisible: false
}
}
  toggleModal = () => {
     this.setState({ isModalVisible: !this.state.isModalVisible });
   };
onClick(){

this.submit();
 this.refs.toast.show('Submit success',DURATION.LENGTH_LONG);
}
updateValue(text){
this.setState({
question:text
})
}

submit(){
var device_id;
let collection={
question:this.state.question,
hotel_id:71,
device_id:DeviceInfo.getUniqueID()
}
var url=string.HTTP+'/create_issue';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json'
})

}).then(res=>res.json())
.catch(error=>console.error('Error:',error)).then(response=>console.log('success:',response));

}


render(){
return(
<View style={{flexDirection:"column",alignItems:"center"}}>
<Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'black'}}>What is your need ?</Text>
<TextInput
multiline={true}
style={{borderWidth:2,borderColor:'black',borderRadius:10,height:hp('20%'),margin:15,}}
placeholder="Please enter and submit your request our support team will reach you shortly"
onChangeText={(text)=>this.updateValue(text,'question')}
/>

<View style={{flexDirection:"row",justiftContent:"space-between"}}>
<TouchableOpacity onPress={()=>{this.onClick()}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'green',textAlign:"center"}}>SUBMIT REQUEST</Text>
</TouchableOpacity>

 </View>
</View>
);
}
}

export default Issue;