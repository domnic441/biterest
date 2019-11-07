import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	Button,
	Platform,
	Dimensions,
	StyleSheet,
	Switch,
	AsyncStorage,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class DrawerStyle extends React.Component {
 state = {
        switchValue: false,
        status:[]
    };
	navLink(nav,text,icon,type) {
		return(
			            <TouchableWithoutFeedback style={{height:hp('20%')}} onPress={() => this.props.navigation.navigate(nav)}>
                    	<Text style={styles.link}>
                    	<Icon name={icon} type="font-awesome"size={25} />
                             {" "}  {text}</Text>
            			</TouchableWithoutFeedback>
            			)
	}

accept_order=()=>
  {
  var url1 = 'http://192.168.0.115/restaurant_new/api/hotel_status/71';
  fetch(url1,{
  method:'GET',
  }).then((response) => response.json())
  .then((responseJson) => {
  if(responseJson.status==0){
  this.setState({switchValue:value});
  }
  else if(responseJson.status==1){
  this.setState({switchValue:value});

  }
  })
  }
navLogout(text,icon){
return(
<TouchableWithoutFeedback style={{height:hp('25%')}} onPress={()=>this.logout()}>
<Text style={styles.link}>
<Icon name={icon} type="antdesign" size={25} />
{" "} {text}</Text>
</TouchableWithoutFeedback>
)
}

logout = async () => {
AsyncStorage.clear()
this.props.navigation.navigate('Login');
}


       render() {
		return(
			<View style={styles.container}>
				<View style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
					<Text style={{marginTop:40,fontSize:hp('2.5%'),fontWeight:'bold',marginRight:30,marginLeft:10,color:"black"}}>
					 Hotel{"\n"}Annapoorna</Text>
				  <Image style={styles.img} resizeMode='contain' source={require('../img/1.png')} />
							</View>

							<View style={styles.profileText}>

                 <Icon name="arrow-left-circle" size={30} style={{textAlign:"right",color:'black' ,marginBottom:125, marginLeft:60}}
                                 onPress={()=>this.props.navigation.goBack()}/>

							</View>
						</View>
					</View >
					<View style={styles.bottomLinks}>
					<View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'black',height:hp('7%'),paddingTop:10}}>
                  <Text style={{color:'black',fontSize:hp('2.3%'),marginLeft:20,marginTop:3}}>Availability</Text>
                   <Text style={{fontWeight:'bold',color:'black',fontSize:hp('2.3%'),marginLeft:70,marginRight:25,marginTop:4}}>{this.state.switchValue ? 'ONLINE' :'OFFLINE'}</Text>
                    <View style={{flex:1}}>
                             <Switch
                                 style={{marginBottom:15,marginRight:20}}
                                 value={this.state.switchValue}
                                 onValueChange ={this.accept_order}/>
                                 </View>
                  </View>
						{this.navLink('Home', 'Home','home')}
						{this.navLink('AllItems', 'Menu','wunderlist')}
						{this.navLink('ActiveOffer', 'Offers','alert-decagram')}
						{this.navLink('OrderHistory', 'Order History','history')}
					    {this.navLink('DeliveryPartners', 'Delivery','motorbike')}
					    {this.navLink('Support', 'Support','message-text')}
                         {this.navLogout('Logout','logout')}
					</View>

				</View>

			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
	},
	profileText: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize:hp('2.3%'),
		textAlign: 'left',
	},
	imgView: {
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	img: {
		height:hp('20%'),
		width:wp('43%'),

	},
	topLinks:{
		height:hp('22%'),
	},
	bottomLinks: {
		flex: 1,
		paddingTop: 10,
		paddingBottom:50,
        color:'black'
	},
	link: {
		flex:1,
		fontSize:hp('2.3%'),
		paddingLeft: 15,
		color:'black',
		textAlign: 'left',
        borderBottomWidth:1,
        paddingTop:20
	},
	footer: {
		height:hp('20%') ,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'black',
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1,
		marginLeft: 20,

	}
})