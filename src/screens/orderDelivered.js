import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,Image,ScrollView } from 'react-native';
import {Button,Icon} from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import DeviceInfo from 'react-native-device-info';
import string from '../common/api'
class OrderDelivered extends Component {
  constructor(props) {
    super(props);

    this.state = {

      results: {
        title: '',
        description: '',
        order_details: []
      }
    };
    this.fetchData = this.fetchData.bind(this);
  }
renderSwitch(payment_status){
switch(payment_status){
case 0:
return 'Not paid';
case 1:
return 'Paid in Cash';

}
}
 getParsedDate(received){
  var datetime =received;
  var myTime = datetime.substr(11,8);
  return myTime;
}


  componentDidMount() {
    this.fetchData();
  }
 fetchData()
  {
  let collection={
  id:71,
  device_id:DeviceInfo.getUniqueID()
  }
  var url = string.HTTP+'/orders';
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
    //this.state.results.movies is the array you have to iterate
    contents = this.state.results.order_details.map((item,index) => {
     if(item.status=='3'){
      return (
          <View key={index} style={ styles.textContainer }>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.title}>Order #{item.order_id}</Text>
           <View style={{flexDirection:'row'}}>
             <Icon name='rupee' type='font-awesome' size={17} iconStyle={{marginTop:5,marginRight:5}}/>
            <Text style={{fontSize: 18,fontWeight:'bold',textAlign:'right',color:'green',marginRight:20}}>{item.amount}</Text>
               </View>
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
           <Text style={styles.title1}>Received at </Text>
          <Text style={styles.title}>{this.getParsedDate(item.received)}</Text>
          </View>
          <Text style={styles.title1,{marginRight:20}}>{this.renderSwitch(item.payment_status)}</Text>
          </View>
           <View style={{flexDirection:'row'}}>
          <Text style={styles.title1}>Delivered at </Text>
          <Text style={styles.title}>{this.getParsedDate(item.received)}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'flex-end'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>{item.customer_name}</Text>
              <Text style={styles.title1}>{item.location}</Text>

                      </View>

            </View>


          </View>
        );
        }
     });
    return (
      <View style={styles.container}>
      <ScrollView>
        {contents}
        </ScrollView>
      </View>
    );
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:5
  },
  textContainer: {
     borderBottomWidth:1,
        borderColor:'black',
        paddingLeft:20,
        width:'100%',
         height:170,paddingTop:5
  },
  title: {
    fontSize: 17,
    fontWeight:'bold',
    textAlign: 'left',
    color:'black'
  },
   title1: {
      fontSize: 16,
      textAlign: 'left',
      color:'black'
    },
  text: {
    fontSize: 18,

    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
});

export default OrderDelivered;