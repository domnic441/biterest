import React, { Component } from 'react';
import { Platform,AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,ScrollView,RefreshControl,Dimensions,platform }
 from 'react-native';
import {Button,Header,Card} from 'react-native-elements'
import CreateOffers from '../screens/createOffers'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialIcons'
import DeviceInfo from 'react-native-device-info';
import ElevatedView from 'react-native-elevated-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api';
class ActiveOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      results: {
        offers: [],

      },
         refreshing: false,
        isModalVisible: false
    };

  }
  toggleModal = () => {
       this.setState({ isModalVisible: !this.state.isModalVisible });
     };


 getParsedDate(received){
  var datetime =received;
  var myDate = datetime.substr(0,10);
  return myDate;
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
 var url = string.HTTP+'/offers';
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

    contents = this.state.results.offers.map((item,index) => {
      return (
          <View key={index} style={ styles.textContainer }>
          <Card containerStyle={{borderRadius:7}}>
          <Text style={styles.text}>{item.description}</Text>
             <Text style={styles.title2}>Offer available for first 3 orders{"\n"}
             use  PROMOCODE   <Text style={{color:'red'}}>{item.promocode}</Text></Text>

              <View style={{flexDirection:'row',alignItems:'space-between',justifyContent:'space-between',marginTop:10 ,borderTopWidth:1}}>
                  <Text style={styles.date}>Added on:{this.getParsedDate(item.valid_from)}</Text>
                   <Text style={styles.date}>Expires on:{this.getParsedDate(item.valid_upto)}</Text>
          </View>
           </Card>
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
       <View style={{flex:1}}>
              <ElevatedView elevation={8}  style={{alignItems:'center', position: 'absolute',
                  bottom:0, right:0,backgroundColor:'#ffc44d',margin:10,height:hp('8%'),width:wp('13%'),justifyContent:'center',borderRadius:50}}>
              <Icon raised={true}

                     name='add'
                     size={25}
                     style={{color:'black'}}
                     onPress={
                      this.toggleModal
                     }
                     />
                 </ElevatedView>
                    <Modal
                        isVisible={this.state.isModalVisible}
                         deviceWidth={wp('100%')}
                         deviceHeight={hp('98%')}
                          style={styles.bottomModal}>
                       <View style={styles.modalContent}>
                     <Header

                     leftComponent={<Icon name='close' size={30} style={{marginBottom:20,color:'black'}} onPress={this.toggleModal}/>}
                     centerComponent={{ text: 'Create New Offer', style: { color: 'black',fontSize:18,marginBottom:22,fontWeight:'bold',marginRight:40 } }}
                     containerStyle={{
                     backgroundColor: '#ffc44d',
                     height:'10%'
                     }}>
                     </Header>
                     <CreateOffers />
                       </View>
                     </Modal>

                     </View>
        </View>
    );
  }
}



var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
        justifyContent:'center',
        width:'100%',
         height:130,
         marginTop:20

  },
  title: {
   fontSize:hp('2.3%'),
    fontWeight:'bold',
    textAlign:'left',
    marginRight:80,

    color:'black'
  },
    title1: {
      fontSize:hp('2.3%'),
      fontWeight:'bold',
      textAlign:'left',
      marginRight:30,
      marginTop:10,
      color:'black'
    },
     title2: {
          fontSize:hp('2.3%'),
          fontWeight:'bold',
          textAlign:'left',
          marginRight:40,
          color:'black'
        },
        date: {
                  fontSize:hp('1.8%'),
                  color:'black'
                },
  text: {
     fontSize:hp('2.7%'),
       fontWeight:'bold',
       textAlign: 'left',

       color:'green'
  },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height:hp('97%')
      },
        bottomModal: {
         justifyContent:'flex-end',
          margin: 0,
        },



});

export default ActiveOffer ;