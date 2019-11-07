
import React, { Component,PureComponent } from "react";
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,Alert, RefreshControl,ScrollView ,FlatList,AsyncStorage} from 'react-native';
import {Button,Icon} from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import Decline from '../screens/decline'
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
export default class NewOrder extends Component {
constructor(){
super()
this.state = {
    data: [],
   interval:'',



  };
}
getParsedDate(received){
  var datetime =received;
  var myTime = datetime.substr(11,8);
  return myTime;
}
renderSwitch(payment_status){
switch(payment_status){
case 0:
return 'Collect in Cash';
case 1:
return 'Paid in Cash';

}
}
componentDidMount() {
 this.fetchData();
 this.interval=setInterval(this.fetchData, 1000);
}
componentWillUnmount(){

 clearInterval(this.interval);

}

deleteItemById = id => {
  const filteredData = this.state.data.filter(item => item.id !== id);
  this.setState({ data: filteredData });
};
  hotel_status_view = async () => {
  let collection={
  id:71,
  device_id:DeviceInfo.getUniqueID()
  }
  try{
    const response = await fetch(string.HTTP+"/hotel_status_view",{
    method:'POST',
    body:JSON.stringify(collection),
    headers: {
       'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
         'Content-Type': 'application/json'
          }});
    const json = await response.json();
    if (json.success==true){
    this.setState({ data: json.order_details });
    }
    else{
    Alert.alert('Bad response verify your credentials')
    }
}  catch (err) {
          console.warn(err);
        }
  };

  fetchData = async () => {
  let collection={
  id:71,
  device_id:DeviceInfo.getUniqueID()
  }
  try{
    const response = await fetch( string.HTTP+"/orders",{
    method:'POST',
    body:JSON.stringify(collection),
    headers: {
       'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
         'Content-Type': 'application/json'
          }});
    const json = await response.json();
    if (json.success==true){
    this.setState({ data: json.order_details, });
    }
    else{
    Alert.alert('Bad response verify your credentials')
    }
}  catch (err) {
          console.warn(err);
        }
  };
  accept_order(order_id)
  {
    let collection={
    id:71,
    device_id:DeviceInfo.getUniqueID()
    }
  var url1 = string.HTTP+'/accept_order';
  fetch(url1,{
  method:'POST',
  }).then((response) => response.json())
  .then((responseJson) => {
  if(responseJson.success==true){
  Alert.alert('Order Accepted')
  }
  })
  }
   reject_order(order_id)
    {
     var device_id;
      let collection={
      id:71,
      device_id:DeviceInfo.getUniqueID()
      }
    var url1 = string.HTTP+'/reject_order';
    fetch(url1,{
    method:'POST',
    }).then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.success==true){
    Alert.alert('Order Rejected')
    }
    })
    }

  renderEntries=({ item, index })=>{
   if(item.status=='0'){

      return(
<TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("OrderDetails")}}>
         <View  style={ styles.textContainer }>

                                <View style={{flexDirection:'column'}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                            <Text style={styles.title}>Order #{item.order_id}</Text>

                            <View style={{flexDirection:'row',marginRight:10}}>
                                <Icon name='rupee' type='font-awesome' size={17} iconStyle={{color:'black',marginTop:5}}/>
                                  <Text style={styles.money}>{item.amount}</Text>
                                  </View>
                                   </View>
                             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.title1}>Received at </Text>
                            <Text style={styles.title}> {this.getParsedDate(item.received)}</Text>
                            </View>
                            <Text style={styles.title1,{marginRight:13}}>{this.renderSwitch(item.payment_status)}</Text>
                            </View>

                               </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'flex-end'}}>
                            <View style={{flexDirection:'column'}}>
                              <Text style={styles.title}>{item.customer_name}</Text>
                                <Text style={styles.title1}>{item.location}</Text>
                                  </View>
                              </View>
                              <View style={{flex: 1, flexWrap: 'wrap',flexDirection:'row'}}>
                                                               {



                                                                item.item.map(item=>
                                                               <View style={{flexDirection:'row'}}>
                                                               <Text >{item.qty} x </Text>
                                                               <Text >{item.item_name}</Text>
                                                               </View>
                                                               )

                                                               }
                                                               </View>

                              <View style={{ flexDirection:'row' ,justifyContent:'space-between',marginRight:10,marginBottom:10}}>

                              <TouchableWithoutFeedback  style={{marginLeft:10}}
                                                             onPress={() => {this.reject_order(item.order_id)

                                                                    }}
                                                               >
                                <Text style={{color:'red',fontSize:hp('2.3%'),marginLeft:140}}>DECLINE</Text>

                                                         </TouchableWithoutFeedback>
                                              <TouchableWithoutFeedback

                          onPress={()=>{this.accept_order(item.order_id)}}>
                          <Text style={{textAlign:'center',color:'green',fontSize:hp('2.3%'),backgroundColor:'#b2d8b2',width:wp('33%'),height:hp('3.5%')
                          }}>
                                                  ACCEPT ORDER
                                                  </Text>
                                              </TouchableWithoutFeedback>
                                              <Toast
                                                  ref="toast"
                                                  style={{backgroundColor:'black'}}
                                                  position='top'
                                                  positionValue={200}
                                                  fadeInDuration={2000}
                                                  fadeOutDuration={2000}
                                                  opacity={0.8}
                                                  textStyle={{color:'white'}}
                                              />




                              </View>
                            </View>
                            </TouchableWithoutFeedback>
      )}}


  render() {
    return (

        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(value, index) => index.toString()}
          renderItem= {this.renderEntries.bind(this)}
           ListHeaderComponent={() => (!this.state.data.length ?
                      <Text style={styles.emptyMessageStyle}>No Orders Yet</Text>
                      : null)}

        />

    );
  }
}

var styles = StyleSheet.create({

  textContainer: {
     flex:1,

     borderBottomWidth:1,
        borderColor:'black',
        paddingLeft:20,
        width:wp('100%'),
         height:hp('28%'),paddingTop:5
  },
  title: {
   fontSize:hp('2.3%'),
    fontWeight:'bold',
    textAlign: 'left',

    color:'black'
  },
    title1: {
      fontSize:hp('2.3%'),
      textAlign: 'left',
      color:'black'
    },
  money: {
      fontSize:hp('2.3%'),
      fontWeight:'bold',
      textAlign: 'left',
      color:'green'
    },
  text: {
    fontSize:hp('2.3%'),

    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
   MainContainer: {
      justifyContent: 'center',
      marginTop: 80,
    },
    emptyMessageStyle: {

        textAlign: 'center',
        }

});