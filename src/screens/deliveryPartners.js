import React, { Component } from 'react';
import {
AppRegistry, ListView, Text, View, StyleSheet, Linking, Platform,
 TouchableWithoutFeedback,TouchableOpacity,Image,AsyncStorage,Animated, Easing
 } from 'react-native';
import {Button,Header,Card} from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import {Icon} from 'react-native-elements'
import ElevatedView from 'react-native-elevated-view'
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import string from '../common/api'
class DeliveryPartners extends Component {

constructor(props) {
super(props);
this.animatedValue1 = new Animated.Value(0)
this.state = {

results: {
title: '',
description: '',
delivery_person: [],
starCount:''
},
};
//Using ES6 we need to bind methods to access 'this'
this.fetchData = this.fetchData.bind(this);
}
 onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

componentDidMount() {
this.fetchData();
this.animate()
}
animate () {
  this.animatedValue1.setValue(0)
  const createAnimation = function (value, duration, easing, delay = 0) {
    return Animated.timing(
      value,
      {
        toValue: 1,
        duration,
        easing,
        delay
      }
    )
  }
  Animated.parallel([
    createAnimation(this.animatedValue1, 2000, Easing.ease),
  ]).start()
}
 callNumber = (REQUEST_URL) =>{
    Linking.canOpenURL(REQUEST_URL).then(supported => {
    if (!supported) {
     console.log('Can\'t handle url: ' + REQUEST_URL);
    } else {
     return Linking.openURL(REQUEST_URL);
    }
  }).catch(err => console.error('An error occurred', err));
 }
onSave = async () => {
           try {
                await AsyncStorage.setItem("key", JSON.stringify(responseData));
                Alert.alert('Saved', 'Successful');
            } catch (error) {
                Alert.alert('Error', 'There was an error.')
            }
        }
fetchData()
{
let collection={
id:71,
device_id:DeviceInfo.getUniqueID()
}
var url = string.HTTP+'/delivery_person';
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
const scaleText = this.animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2]
  })
contents = this.state.results.delivery_person.map((item) => {

return (

<ElevatedView
elevation={3}
style={styles.stayElevated} key={item.mobile}>

<View style={ styles.container }>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View  style={{alignItems:'center',
      backgroundColor:'black',marginLeft:10,height:hp('10.5%'),width:wp('16%'),justifyContent:'center',borderRadius:10,marginTop:20}}>
<Image
          style={{height:hp('7.5%'),width:wp('12.5%'),marginTop:8}}
          source={require("../img/p.png")}

        />
    <View  style={{backgroundColor:'#00b300',height:hp('1.5%'),width:wp('2.3%'),borderRadius:50,marginLeft:60,marginTop:2}}>
   </View>
  </View>



<View style={{flexDirection:'column',marginTop:10}}>
<View >
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.title}>{item.mobile}</Text>
    <Text style={styles.title}>Delivered {item.delivered_count} times</Text>
    <View style={{flexDirection:"row"}}>
      <Text style={styles.title3}>Overall rating  </Text>
         <StarRating
            starSize={15}
            disabled={false}
            halfStarEnabled={true}
            maxStars={5}
            fullStarColor="#ffb82b"
            rating={item.ratings}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starStyle={{marginTop:3}}
          />
          </View>


  </View>
   </View>
 <View  style={{alignItems:'center',
backgroundColor:'green',margin:10,height:hp('5%'),width:wp('8.5%'),justifyContent:'center',borderRadius:50,marginTop:40,marginRight:15}}>
<Icon name='phone' type='feather' size={15} onPress={()=> this.callNumber(`tel:+91${item.mobile}`)} iconStyle={{color:'white'}} />
</View>
</View>
</View>
</ElevatedView>
);

});
return (
<View style={styles.container}>
<View style={{backgroundColor:"#E8E8E8",height:hp('8%')}}>
<Text style={{fontSize:hp('2.3%'),fontWeight:"bold",color:'black',textAlign:"center",marginTop:10}}>Delivery partners who have delivered food for your customers.</Text>
</View>
{contents}
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F8F8F8',
marginTop:1
},

title: {
fontSize:hp('2.3%'),
fontWeight:'bold',
color:'black'
},
title3: {
fontSize:hp('2.3%'),
color:'black'
},
title1: {
fontSize:hp('2.3%'),
fontWeight:'bold',
marginLeft:30,
color:'black'
},
title2: {
fontSize:hp('2.3%'),
fontWeight:'bold',
textAlign:'left',


color:'red'
},
text: {
fontSize:hp('2.3%'),
fontWeight:'bold',
textAlign: 'left',

color:'green'
},
stayElevated: {
width:wp('95%'),
height:hp('17%'),
margin: 10,
backgroundColor: 'white',
borderRadius:10
},

});

export default DeliveryPartners ;