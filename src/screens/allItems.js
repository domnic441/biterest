import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableHighlight,RefreshControl,ScrollView,Alert } from 'react-native';
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
import {Icon} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
class AllItems extends Component {
constructor(props) {
super(props);

this.state = {
results: {
menu: []
},
refreshing:false,
};
this.fetchData = this.fetchData.bind(this);
}

componentDidMount() {
this.fetchData();
}
_onRefresh = () => {
    this.setState({refreshing: true}, this.fetchData);

  };
fetchData()
{
let collection={
id:71,
device_id:DeviceInfo.getUniqueID()
}
var url = string.HTTP+'/menu';
fetch(url,{
method:'POST',
body:JSON.stringify(collection),
headers:new Headers({
'Content-Type':'application/json'
})
})
.then((response) => response.json())
.catch(error=>console.error('Error',error))
.then(response => {
if (response.success==true){
this.setState({results:response });
}
else
Alert.alert('Bad response verify your credentials')
})
}

render() {
contents = this.state.results.menu.map((item) => {
if(item.restmenu_active=='1'){
return (

<View key={item.product_name}  >

<SwipeRow
leftOpenValue={100}

>
<View style={{backgroundColor:'green',borderWidth:1,height:hp('7.5%')}}>
<Text style={{color:'white',marginLeft:10,marginTop:15}}>IN STOCK</Text>

</View>
<View style={{backgroundColor:'#fff2f2',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',height:hp('7.5%')}}>
<Text style={{fontSize:hp('2.3%'),color:'#cc0000',marginTop:14,marginLeft:15}} >{item.product_name}</Text>
<Icon name='chevron-double-right' type='material-community' iconStyle={{marginTop:13}} />
</View>
</SwipeRow>

</View>

);
}
else if(item.restmenu_active=='0'){
return (


<View key={item.name} >
<SwipeRow
rightOpenValue={-100}

>
<View style={{backgroundColor:'red',borderWidth:1,height:hp('7.5%')}}>
<Text style={{color:'white',textAlign:'right',marginTop:15}}>OUT OF STOCK</Text>

</View>
<View style={{backgroundColor:'white',borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',height:hp('7.5%')}}>
<Text style={{fontSize:hp('2.3%'),color:'black',marginTop:14,marginLeft:15}} >{item.product_name}</Text>
<Icon name='chevron-double-left' type='material-community' iconStyle={{marginTop:13}}/>
</View>
</SwipeRow>

</View>
);
}


});

return (
<View style={styles.container}>
<ScrollView
refreshControl={
      <RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh.bind(this)}
           title='Pull to refresh'/>
           }
            >
<View style={{flexDirection:"row",backgroundColor:"white",height:hp('7.5%')}}>
<Icon name='info-outline' type='MaterialIcons' iconStyle={{marginTop:15,marginLeft:20}} />
<Text style={{fontSize:hp('2%'),color:'black',textAlign:"center",marginTop:10,marginLeft:20}}>
Click on the items or swipe left to mark as out of {"\n"} stock and swipe right to make items in stock.</Text>
</View>
<View style={{flexDirection:"row",backgroundColor:"#E8E8E8",borderWidth:1,borderColor:"#E8E8E8",height:hp('7.5%')}}>
<Text style={{fontSize:hp('2.3%'),color:'black',textAlign:"center",marginTop:10,marginLeft:20}}>
Breakfast</Text>
<View style={{flexDirection:"row",marginLeft:170}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:"bold",color:'black',textAlign:"center",marginTop:10,height:hp('7.5%')}}>
06.30-11.00 AM</Text>
<Icon name='pencil-outline' type='material-community' iconStyle={{marginTop:7,marginLeft:10}} />
</View>
</View>

{contents}
<View style={{flexDirection:"row",backgroundColor:"#E8E8E8",borderWidth:1,borderColor:"#E8E8E8",height:hp('7.5%')}}>
<Text style={{fontSize:hp('2.3%'),color:'black',textAlign:"center",marginTop:10,marginLeft:20}}>
Staters</Text>
<View style={{flexDirection:"row",marginLeft:170}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:"bold",color:'black',textAlign:"center",marginTop:10,marginLeft:20}}>
12.30-3.30 PM</Text>
<Icon  name='pencil-outline' type='material-community' iconStyle={{marginTop:7,marginLeft:10}} />
</View>
</View>
 </ScrollView>
</View>
);
}
}



var styles = StyleSheet.create({
container: {
flex: 1,


},

});

export default AllItems;