import React, { Component } from 'react';
import { Platform,AppRegistry, ListView, Text, View, StyleSheet, TouchableWithoutFeedback,ScrollView,RefreshControl,Dimensions,platform }
from 'react-native';
import {Button,Header} from 'react-native-elements'
import NewTicket from '../screens/newTicket'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ElevatedView from 'react-native-elevated-view'
import DeviceInfo from 'react-native-device-info'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import string from '../common/api'
class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {

      results: {
        issue: [],

      },
       refreshing: false,
       isModalVisible: false
    };

  }
toggleModal = () => {
     this.setState({ isModalVisible: !this.state.isModalVisible });
   };

  componentDidMount() {
    this.fetchData();
  }
  _onRefresh = () => {
    this.setState({refreshing: true},this.fetchData);
  };
 fetchData()
 {
 var device_id;
 let collection={}
 collection.id=71,
 collection.device_id=DeviceInfo.getUniqueID();
 var url = string.HTTP+'/list_issue';
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
 if (response.success=true){
 this.setState({results:response });
 }
 else
 Alert.alert('Bad response verify your credentials')
 })
 }
getTextStyle(t) {
 if(t=="Open") {
  return 1;

 } if(t=="Solved"){
   return 2;


 }
 else
 return 3;


}
  render() {
const deviceWidth = Dimensions.get("window").width;


    contents = this.state.results.issue.map((item,index) => {

      return (

      <ElevatedView
      elevation={3}
      style={styles.stayElevated} key={'mykey' + index}>
          <View style={{marginLeft:10}}>
           <View style={{ flexDirection:'row'}}>
          <Text style={styles.text}>{item.faq_id}</Text>
           <Text style={[(this.getTextStyle(item.q_status)==1)? styles.textvalid1:styles.text2,
                            (this.getTextStyle(item.q_status)==2)? styles.textvalid2:styles.text2,
                              (this.getTextStyle(item.q_status)==3)? styles.textvalid3:styles.text2, ]}>{item.q_status}</Text>
          </View>
           <Text style={styles.title1}>{item.created_at}</Text>
           <View style={{flexDirection:"row"}}>
            <Text style={styles.title1}>Query: </Text>
            <Text style={{fontSize:15,color:"black"}}>{item.question}</Text>
            </View>

           <View style={{flexDirection:"row"}}>
             <Text style={styles.title1}>Response:{" "}

            <Text style={{fontSize:15,color:"black"}}> {item.answer}{"\n"} </Text> </Text>

          </View>

</View>
</ElevatedView>



        );

     });
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
        {contents}
       </ScrollView>
       <View style={{flex:1}}>
                           <ElevatedView elevation={8}  style={{alignItems:'center', position: 'absolute',
                               bottom:0, right:0,backgroundColor:'#ffc44d',margin:10,height:hp('8%'),width:wp('13%'),
                               justifyContent:'center',borderRadius:50}}>
                           <Icon raised={true}

                                  name='add'
                                  size={25}
                                  style={{color:'black'}}
                                  onPress={
                                 this.toggleModal
                                  }
                                  />
                              </ElevatedView>
                             </View>
                                 <Modal
                                           isVisible={this.state.isModalVisible}
                                            deviceWidth={deviceWidth}
                                            deviceHeight={deviceHeight}
                                            style={styles.bottomModal}>
                                           <View style={styles.modalContent}>
                                                 <Header

                                                  leftComponent={<Icon name='close' size={30} style={{marginBottom:20,color:'black'}} onPress={ this.toggleModal}/>}
                                                  centerComponent={{ text: 'Create New Ticket', style: { color: 'black',fontSize:hp('2.5%'),marginBottom:22,fontWeight:'bold',marginRight:40 } }}
                                                  containerStyle={{
                                                  backgroundColor: '#ffc44d',
                                                  height:'10%'
                                                  }}>
                                                  </Header>
                                                  <NewTicket />
                                            </View>
                                            </Modal>
        </View>
    );
  }
}



var styles = StyleSheet.create({
stayElevated: {
width: 390,
height: 140,
margin: 10,
backgroundColor: 'white',
borderRadius:5
},
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:5
  },
  textContainer: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
     borderWidth:1,
     borderColor:'black',
        paddingLeft:10,
        width:wp('95%'),
         height:hp('30%'),paddingTop:5,
         margin:10,
        borderRadius:10
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
     fontSize:hp('2.3%'),
       fontWeight:'bold',
       textAlign: 'left',

       color:'black'
  },
  text2: {
       fontSize:hp('2.3%'),
       fontWeight:'bold',
       textAlign:'center',
       marginLeft:200,
       borderWidth:1,
       borderColor:"white",
       borderRadius:5,
       width:"20%",
    },
 textvalid1: {

       backgroundColor:"#FFCCCC",
       color:'#4c3d3d',
       paddingTop:3
  },
textvalid2: {
       color:'green'
  },
  textvalid3: {
         color:'orange'
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

export default Support ;