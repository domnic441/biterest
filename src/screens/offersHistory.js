import React, { Component } from 'react';
import { Platform,AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,ScrollView,RefreshControl } from 'react-native';
import {Button,Header} from 'react-native-elements'
import CreateOffers from '../screens/createOffers'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
var REQUEST_URL = string.HTTP+'/offers/1';

class OfferHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {

      results: {
        offers: [],

      },
         refreshing: false,
    };
  }


  componentDidMount() {
    this.fetchData();
  }
  _onRefresh = () => {
    this.setState({refreshing: true}, this.fetchData);

  };
  fetchData() {
    fetch(REQUEST_URL,
    {headers: {
    'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
                                }})
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
    contents = this.state.results.offers.map((item,index) => {

      return (


          <View key={index} style={ styles.textContainer }>

          <Text style={styles.text}>FLAT 50% OFF</Text>
             <Text style={styles.title2}>Offer available for first 3 orders{"\n"}
             use  PROMOCODE   <Text style={{color:'red'}}>{item.promocode}</Text></Text>

              <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                  <Text style={styles.title1}>Added on:{item.from_date}</Text>
                   <Text style={styles.title}>Expires on:{item.to_date}</Text>
          </View>

</View>




        );

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
    alignItems:'center',
    marginTop:10,
    backgroundColor: '#FFFFFF',

  },
  textContainer: {

     borderWidth:1,
     borderColor:'black',
        width:wp('95%'),
         height:hp('20%'),padding:5,
        borderRadius:10
  },
  title: {
    fontSize:hp('2.3%'),
    fontWeight:'bold',
    textAlign:'left',
    color:'black'
  },
    title1: {
      fontSize:hp('2.3%'),
      fontWeight:'bold',
      textAlign:'left',
      marginRight:40,

      color:'black'
    },
     title2: {
         fontSize:hp('2.3%'),
          fontWeight:'bold',
          textAlign:'left',
        marginRight:40,

          color:'black'
        },
  text: {
    fontSize:hp('2.7%'),
       fontWeight:'bold',
       textAlign: 'left',

       color:'green'
  },



});

export default OfferHistory ;