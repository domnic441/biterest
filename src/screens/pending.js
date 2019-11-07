import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback ,RefreshControl,ScrollView,Alert,Image} from 'react-native';
import {Button,Icon} from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import DeviceInfo from 'react-native-device-info';
import string from '../common/api'

class Pending extends Component {
  constructor(props) {
    super(props);

    this.state = {

      results: {
        title: '',
        description: '',
        order_details: []
      },
      refreshing:false,
    };
    //Using ES6 we need to bind methods to access 'this'
  }
 getParsedDate(received){
  var datetime =received;
  var myTime = datetime.substr(11,8);
  return myTime;
}


  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
          this.fetchData();
                });}


_onRefresh = () => {
    this.setState({refreshing: true}, this.fetchData);

  };
 fetchData()
  {
  let collection={
  id:71,
  device_id:DeviceInfo.getUniqueID()
  }
  var url = string.HTTP+"/orders";
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
  })
  }

  render() {
    contents = this.state.results.order_details.map((item,index) => {
     if(item.status =='1'){
      return (
          <View key={index} style={ styles.textContainer }>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.title}>Order #{item.order_id}</Text>
           <View style={{flexDirection:'row'}}>
            <Icon name='rupee' type='font-awesome' size={17} iconStyle={{color:'black',marginTop:5,marginRight:5}}/>
            <Text style={{fontSize: 18, fontWeight:'bold', textAlign:'right',color:'green',marginRight:20}}>{item.amount}</Text>
             </View>
           </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.title1}>Received at</Text>
           <Text style={styles.title}>  {this.getParsedDate(item.received)}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                      <Text style={styles.title1}>Deliver by</Text>
                       <Text style={styles.title}>  {this.getParsedDate(item.received)}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:"space-between"}}>
             <View style={{flex:1,flexDirection:'column'}}>
            <Text style={styles.title}>{item.customer_name}</Text>
             <View style={{flex:.7,flexWrap:'wrap',flexDirection:'row',justifyContent:"center"}}>
              <Text style={styles.title1}>{item.location}</Text>
              </View>
               </View>
                      	<TouchableWithoutFeedback 	onPress={()=>{this.props.navigation.navigate("ProcessingOrderDetails")}}>

                      		<View style={styles.imgView}>
                      	    <Icon name='target-account' type='material-community' size={25} iconStyle={{marginTop:7}}/>
              <Text style={{fontSize:12,fontWeight:'bold',marginLeft:30,marginRight:20,color:"black",marginBottom:10}}>Track{"\n"}partner</Text>
                </View>
                       </TouchableWithoutFeedback>

            </View>


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
           title='Pull to refresh'
      />
      }
      >
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
         height:180,paddingTop:5
  },
    title: {
    fontSize: 18,
    fontWeight:'bold',
    textAlign: 'left',

    color:'black'
  },
   title1: {
      fontSize:16,
      color:'black'
    },
  text: {
    fontSize: 18,

    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
  imgView: {
        alignItems:"center",
  		flexDirection:'column',
  		backgroundColor:"#f5f5f5",
        marginRight:10,
  		height:75
  	},
  	img: {
    		height:45,
    		width: 45,

    	},
});

export default Pending;