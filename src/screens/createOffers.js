import React,{Component} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableWithoutFeedback,ScrollView,Switch} from 'react-native';
import {Icon,Button,Header} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import DeviceInfo from 'react-native-device-info';
import string from '../common/api'
class CreateOffers extends Component{
constructor(){
super()
this.state = {
checkedRadio: null,
date:"",
favorite: false,
MStatus:false,
hotel_id:"71",
promocode:"",
discount_type:"0",
discount_amount:'',
description:"",
from_date:"07-08-2019",
to_date:"10-08-2019",
content: false,
switchValue: false
};

}
update(text){
this.setState({
discount_amount:text

})
}
value(text){
this.setState({
promocode:text

})
}
description(text){
this.setState({
description:text

})
}



setNativeProps = (nativeProps) => {
this._root.setNativeProps(nativeProps);
}
ShowHideTextComponentView = () =>{

if(this.state.MStatus == true)
{
this.setState({MStatus: false})
}
else
{
this.setState({MStatus: true})
}
}

componentHideAndShow = () => {
this.setState(previousState => ({ content: !previousState.content }))
}


submit()
{
let collection={
hotel_id:this.state.hotel_id,
promocode:this.state.promocode,
discount_type:this.state.discount_type,
discount_amount:this.state.discount_amount,
description:this.state.description,
from_date:this.state.from_date,
to_date:this.state.to_date,
device_id:DeviceInfo.getUniqueID()
}
var url = string.HTTP+'/create_offer';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json',
 'Accept': 'application/json'
})

}).then(res=>res.json())
.catch(error=>console.error('Error:',error)).then(response=>console.log('success:',response));

}


render(){
const { favorite } = this.state;
return(

<View style={{flex:1,flexDirection:'column'}}>
<Text style={{fontSize:15,fontWeight:'bold',color:'black',padding:8,marginTop:5,marginLeft:12}}>Choose category to create an offer </Text>
<View style={{flexDirection:'row',marginLeft:10,alignItem:'center'}}>
<View style={{flexDirection:'row',marginLeft:20}}>
<Icon name="circle-o"
color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
type='font-awesome' size={25}

/>
<Text style={{color:'black',fontWeight:'bold',marginLeft:20,marginTop:2}}>For All Items</Text>
</View>
<View style={{flexDirection:'row',marginLeft:50}}>
<Icon name="circle-o"
type='font-awesome' size={25}
onPress={this.componentHideAndShow}
/>
<Text style={{color:'black',fontWeight:'bold',marginLeft:20,marginTop:2}}>For Selective Items</Text>
</View>
</View>
<View style={{flexDirection:'column',justifyContent:'center',alignItem:'center'}}>

<TextInput
style={{borderWidth:1,borderColor:'black',borderRadius:10,backgroundColor:'#ededed',width:'90%',height:50,marginLeft:20,marginTop:10,textAlign:'auto'}}
placeholder='Enter the promo Code here '
onChangeText={(text)=>this.value(text,'promocode')}
/>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItem:'space-between'}}>
<Icon name='information-outline' type='material-community' size={18}iconStyle={{marginLeft:30,marginTop:10}}/>
<Text style={{fontStyle:'italic',fontSize:13,color:'black',marginTop:10,marginRight:20}}>Any informational notes goes here..(Validations,Error msgs)</Text>
</View>
<View style={{flexDirection:'row',alignItem:'space-between'}}>

<TextInput
style={{borderWidth:1,borderColor:'black',borderRadius:10,backgroundColor:'#ededed',width:'40%',height:50,marginLeft:20,marginTop:10,textAlign:'auto'}}
placeholder='Discount Value'
onChangeText={(text)=>this.update(text,'discount_amount')}
/>
<View style={{flexDirection:'row',alignItem:'center',marginTop:20,marginLeft:55}}>
<Icon name='percent' type='feather' size={25}iconStyle={{marginLeft:15,marginRight:10}}/>
 <Switch
                                 style={{marginBottom:15,marginRight:10}}
                                 value={this.state.switchValue
                                 }
                                 onValueChange ={(switchValue)=>this.setState({switchValue})}/>
<Icon name='rupee' type='font-awesome' size={25} />
</View>
</View>
<View style={{flexDirection:'row'}}>
<Icon name='information-outline' type='material-community' size={18}iconStyle={{marginLeft:30,marginTop:10}}/>
<Text style={{fontStyle:'italic',fontSize:13,color:'black',marginTop:10,marginRight:20}}>Any informational notes goes here..(Validations,Error msgs)</Text>
</View>

<TextInput
style={{borderWidth:1,borderColor:'black',borderRadius:10,backgroundColor:'#ededed',width:'90%',height:120,marginLeft:20,marginTop:10,textAlignVertical:'top'}}
placeholder='Enter a short description for this offer'
onChangeText={(text)=>this.description(text,'description')}
/>
<View style={{flexDirection:'row'}}>
<Icon name='information-outline' type='material-community' size={18}iconStyle={{marginLeft:30,marginTop:10}}/>
<Text style={{fontStyle:'italic',fontSize:13,color:'black',marginTop:10,marginRight:20}}>Any informational notes goes here..(Validations,Error msgs)</Text>
</View>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginRight:30,marginTop:10,marginLeft:30}}>
<Text style={{color:'black',marginLeft:20}}>From Date</Text>
<Text style={{color:'black',marginRight:100}}>To Date</Text>
</View>
<View style={{flexDirection:"column"}}>
<View style={{flexDirection:'row',justifyContent:'space-between',marginRight:30,marginTop:5,marginLeft:30}}>

<DatePicker
style={{width: 170,backgroundColor:'#ededed', borderRadius:10,}}
date={this.state.date}
mode="date"
placeholder="select date"
format="YYYY-MM-DD"
minDate="2016-05-01"
maxDate="2016-06-01"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{

dateInput: {

},
dateIcon: {
position: 'absolute',
left: 0,
top: 4,
marginLeft: 0
},

// ... You can check the source to find the other keys.
}}
onDateChange={(date) => {this.setState({date: date})}}
/>
<DatePicker
style={{width: 170,borderRadius:10,backgroundColor:'#ededed'}}
date={this.state.date}
mode="date"
placeholder="select date"
format="YYYY-MM-DD"
minDate="2016-05-01"
maxDate="2016-06-01"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{

dateInput: {

},
dateIcon: {
position: 'absolute',
left: 0,
top: 4,
marginLeft: 0
},
// ... You can check the source to find the other keys.
}}
onDateChange={(date) => {this.setState({date: date})}}
/>

</View>
</View>

{

this.state.content ?<Text style={styles.headerText}>Choose Items to add</Text>: null

}
<View style={{position: 'absolute',bottom:0,width:'100%'}}>
<Button
title="CREATE OFFER"
buttonStyle={{backgroundColor:'#2e8b57'}}
onPress={()=>this.submit()}
/>
</View>


</View>
);

}
}

export default CreateOffers;
const styles=StyleSheet.create({
container:{
fontSize:20,
color:'black',
},
headerText: {
fontSize: 16,

height:40,
margin: 20,
fontWeight: "bold",
backgroundColor:'#d3d3d3'
}



})