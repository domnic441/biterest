import React,{Component} from 'react';
import {StyleSheet,View,Text,Switch,TextInput} from 'react-native';
import {Icon,Button} from 'react-native-elements';

class Decline extends Component{
render(){
return(
<View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{fontSize:23,fontWeight:'bold',color:'black',padding:8,marginTop:10}}>Why do you want to decline the order </Text>
</View>
<View style={{flexDirection:'column',justifyContent:'center',alignItem:'center'}}>
<TextInput
style={{borderWidth:1,borderColor:'black',backgroundColor:'#ededed',width:'90%',height:90,marginLeft:20,marginTop:20,textAlign:'center'}}
placeholder='please provide a reason to decline this order'

/>

</View>
<View style={{flexDirection:'row',padding:40,justifyContent:'space-between'}}>
<Text style={{color:'red',fontSize:20,marginTop:10}}>CANCEL</Text>

<Button
  buttonStyle={{backgroundColor:'green',marginBottom:10,borderRadius:15}}
  title="DECLINE ORDER"
/>
</View>
</View>

);

}
}

export default Decline;
const styles=StyleSheet.create({
container:{
fontSize:20,
color:'black',
},


})