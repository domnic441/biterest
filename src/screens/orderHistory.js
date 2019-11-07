import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,TouchableOpacity,FlatList,ScrollView,RefreshControl,Alert } from 'react-native';
import {Button,Header,Card,Icon} from 'react-native-elements'
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
export default class OrderHistory extends Component {
constructor(){
super()
this.state = {
data: [],
refreshing: false,
};
}

componentDidMount() {
this.fetchData();
}

_onRefresh = () => {
this.setState({refreshing: true},this.fetchData);
};

renderSwitch(status){
switch(status){
case 0:
return 'Pending';
case 1:
return 'InProgress';
case 2:
return 'Accept';
case 3:
return 'Delivered';
case 4:
return 'Cancelled';
}
}

fetchData()
{
let collection={
id:71,
device_id:DeviceInfo.getUniqueID()
}
var url = string.HTTP+'/order_history';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json'
})
})
.then((response) => response.json())
.catch(error=>console.log('Error',error))
.then(response=>{
if(response.success==true)
{
this.setState({data:response.order_details,refreshing:false});
}
else
Alert.alert('Bad response verify your credentials');
})
}


renderEntries({ item, index }) {

return(



<View key={'mykey',index}>
<Card>
<View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
<View style={{flex:1,flexDirection:'column',marginTop:10}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'black'}}>{item.order_id}</Text>
<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'black'}}>{item.customer_name}</Text>
<Text style={{color:'black'}}>{item.location}</Text>
</View>
<View style={{flexDirection:'column',marginTop:10}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'black'}}>{item.received}</Text>
<Text style={{fontSize:hp('2.3%'),color:'green',padding:8}}>{item.amount}</Text>
<Text style={{fontSize:hp('2.3%'),fontWeight:'bold',color:'black',marginLeft:10}}>{this.renderSwitch(item.status)}</Text>


</View>
</View>
</Card>
</View>

);

}


render() {
return (
<View style={styles.container}>
<ScrollView
refreshControl={
<RefreshControl
refreshing={this.state.refreshing}
onRefresh={this._onRefresh}
title='Pull to refresh'

/>
}
>
<View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:'#dcdcdc',height:40,padding:10}}>
<Text>Showing orders for</Text>
<Icon name="calendar" type="antdesign" />
</View>
<FlatList
data={this.state.data}
extraData={this.state}
keyExtractor={(value, index) => index.toString()}
renderItem= {this.renderEntries.bind(this)}
/>

</ScrollView>
</View>


);

}
}

const styles = StyleSheet.create({
stayElevated: {
width:wp('80%'),
height:hp('23%'),
margin: 10,
backgroundColor: 'white'
},

});