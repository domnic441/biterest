import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback ,RefreshControl,ScrollView,Alert,Image} from 'react-native';
import {Button,Icon} from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
import string from '../common/api'

var REQUEST_URL = string.HTTP+'/orders/1';

class ProcessingOrderDetails extends Component {
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


  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
          this.fetchData();
                });}


_onRefresh = () => {
    this.setState({refreshing: true}, this.fetchData);

  };

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          results: responseData,
         refreshing:false
        });
      })
      .done();
  }

  render() {
    //this.state.results.movies is the array you have to iterate
    contents = this.state.results.order_details.map((item) => {
     if(item.status=='Accepted'){
      return (
          <View key={item.name} style={ styles.textContainer }>
          <Text style={styles.title}>Order Id :{item.order_id}</Text>
          <Text style={styles.title}>Received at :{item.received}</Text>
          <View style={{flex:.8,flexDirection:'row',justifyContent:"space-between"}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>Name : {item.customer_name}</Text>
              <Text style={styles.title}>{item.location}</Text>
              <View style={{flexDirection:'row'}}>
                           <Icon name='rupee' type='font-awesome' size={17} iconStyle={{color:'black',marginTop:5}}/>
                                     <Text style={{fontSize: 18, fontWeight:'bold', textAlign: 'left',color:'green'}}>{item.amount}</Text>
                                    </View>
            </View>

                      	<TouchableWithoutFeedback 	onPress={()=>{this.props.navigation.navigate("Location")}}>

                      		<View style={styles.imgView}>
                      	    <Image style={styles.img} source={require('../img/2.png')} />
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
         height:170,paddingTop:5
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    textAlign: 'left',

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
  		marginTop:10,
  		backgroundColor:"#E8E8E8",
  		marginLeft:150,marginRight:20



  	},
  	img: {
    		height:45,
    		width: 45,

    	},
});

export default ProcessingOrderDetails;