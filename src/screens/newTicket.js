import React,{Component} from 'react';
import {StyleSheet,View,Text,Switch,TextInput,TouchableWithoutFeedback,Dimensions,Platform} from 'react-native';
import {Icon,Button,Header} from 'react-native-elements'
import Issue from '../screens/issue'
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class NewTicket extends Component{
 state = {
    isModalVisible: false
  };
  toggleModal = () => {
     this.setState({ isModalVisible: !this.state.isModalVisible });
   };
render(){
return(
<View style={styles.container}>
<Text style={{fontSize:hp('2.5%'),color:'black',backgroundColor:'#ededed',padding:10}}>How can we help you?</Text>
<Text style={styles.text}>Issue with the order</Text>
<Text style={styles.text}>Issue with Delivery</Text>
<Text style={styles.text}>Issue with Delivery</Text>
<Text style={styles.text}>Issue with Delivery executive</Text>

<TouchableWithoutFeedback
onPress={
this.toggleModal
}
>
<View style={{flex:1}}>
<Text style={styles.text}>other issue</Text>
<Modal
isVisible={this.state.isModalVisible}
onSwipeComplete={() => this.setState({ isVisible: false })}
  swipeDirection="down"
 deviceWidth={wp('100%')}
 deviceHeight={hp('65%')}
 style={styles.bottomModal}>
<View style={styles.modalContent}>
<Icon name='close' type='MaterialIcons' iconStyle={{marginLeft:270}} onPress={this.toggleModal}/>
 <Issue/>
</View>
        </Modal>
</View>
</TouchableWithoutFeedback>

</View>

);

}
}

export default NewTicket;
const styles=StyleSheet.create({
container:{
flex:1
},
text:{
borderBottomWidth:1,
padding:10,
fontSize:hp('2.5%'),
color:'black',
paddingLeft:20
},
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height:hp('45%')
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

})