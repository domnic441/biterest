import React, { Component } from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Dimensions,
StatusBar
} from "react-native";
import {Icon} from "react-native-elements";

import {
createAppContainer ,
createSwitchNavigator} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/home'
import Location from '../screens/location'
import OrderHistory from '../screens/orderHistory'
import OffersHistory from '../screens/offersHistory'
import Details from '../screens/details'
import Todo from '../screens/todo'
import DrawerStyle from './drawerStyle'
import Login from '../screens/login'
import SignUp from '../screens/signup'
import ActiveOffer from '../screens/activeoffer'
import DeliveryPartners from '../screens/deliveryPartners'
import Support from '../screens/support'
import AllItems from '../screens/allItems'
import OutOfStock  from '../screens/outofStock'
import NewOrder from '../screens/newOrder'
import Pending from '../screens/pending'
import OrderDelivered from '../screens/orderDelivered'
import ProcessingOrderDetails from '../screens/processOrderDetails'
import OrderDetails from '../screens/orderDetails'
import AuthLoading from '../screens/authloading'
import { SearchBar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<DrawerStyle navigation={navigation} />)
	}
}
pressLogin = () => {
 this.props.navigation.navigate('Login')
 }

const topNavigator1= createMaterialTopTabNavigator({
  AllItems:{

    screen:AllItems,
    headerTintColor: 'black',
   navigationOptions:({ navigation }) => ({
                  headerTitleStyle:{
                   fontWeight:'bold',
                   fontSize:hp('2.2%'),

                   },
  }),

  },
  OUT_OF_STOCK:{

    screen:OutOfStock,
    navigationOptions:({ navigation }) => ({
                   title: 'OUT OF STOCK',
                   headerTintColor: 'black',
  }),
  },
  },
  {
      tabBarPosition: 'top',
      swipeEnabled:false,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#ffc44d',
        },
        labelStyle: {
          textAlign: 'center',
           color:"black",
           fontWeight:'bold',
            fontSize:hp('2.2%'),
        },
        indicatorStyle: {
          borderBottomColor: 'black',
          borderBottomWidth: 3,
          width:wp('45%'),
          marginLeft:10

        },
      },
    }

  );
  const topNavigator2= createMaterialTopTabNavigator({
  ACTIVE:{
    screen:ActiveOffer,
    title: 'New',
    headerTintColor: 'black',
   navigationOptions:({ navigation }) => ({
                  headerTitleStyle:{
                   },
  }),

  },
  OUT_OF_STOCK:{

    screen:OffersHistory,
    navigationOptions:({ navigation }) => ({
                   title: 'HISTORY',
                   headerTintColor: 'black',
  }),
  },
  },
  {
      tabBarPosition: 'top',
      swipeEnabled:false,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#ffc44d',
        },
        labelStyle: {
          textAlign: 'center',
          color:"black",
          fontWeight:'bold',
          fontSize:hp('2.2%'),
        },
        indicatorStyle: {
          borderBottomColor: 'black',
          borderBottomWidth:3,
          width:wp('45%'),
           marginLeft:10
        },
      },
    }

  );
const topNavigator= createMaterialTopTabNavigator({
New:{
  screen:NewOrder,

},
PROCESSING:{

  screen:Pending,

},
DELIVERED:{

  screen:OrderDelivered,

}
},
{
    tabBarPosition: 'top',
    swipeEnabled:false,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: '#ffc44d',
      },
      labelStyle: {
        fontWeight:'bold',
        color:'black',
        fontSize:hp('2%'),

      },
      indicatorStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
         width:wp('28%'),
         marginLeft:10
      },
    },
  }

);
const stackNavigator = createStackNavigator({
Home:{
         screen: topNavigator,

          navigationOptions:({ navigation }) => ({

               headerStyle: {
                 backgroundColor: '#ffc44d',
                  elevation: 0, // remove shadow on Android
                  shadowOpacity: 0, // remove shadow on iOS

               },
               headerTintColor: 'black',
               title: 'Orders Today',

               headerLeft: (

                        <View style={{ paddingHorizontal: 20 }}>
                        <Icon name="menu" type='feather' size={25} onPress={() => navigation.openDrawer()}/>
                        </View>

                        ),

                        headerRight:(
                        <View style={{ flexDirection:'row',paddingHorizontal: 20 ,marginBottom:10}}>
                                   <Icon name="search" type='fontawesome'  size={25} onPress={this.pressLogin}/>
                                  </View>

                        )
             }),
 },
AllItems:{

             screen: topNavigator1,
                navigationOptions:({ navigation }) => ({
                     headerStyle: {
                       backgroundColor: '#ffc44d',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS

                     },
                     headerTintColor: 'black',
                     title: 'Manage Menu',

                     headerLeft: (

                              <View style={{ paddingHorizontal: 20 }}>
                              <Icon name="menu" type='feather' size={25} onPress={() => navigation.openDrawer()}/>
                              </View>

                              ),
                     headerRight:(
                                <View style={{ paddingHorizontal: 20 ,marginBottom:5}}>
                                 <Icon name="search" type='font-awesome'  size={25} onPress={() => navigation.openDrawer()}/>
                                 </View>

                                  )

                   }),
       },
ActiveOffer:{

                   screen: topNavigator2,
                      navigationOptions:({ navigation }) => ({
                           headerStyle: {
                             backgroundColor: '#ffc44d',
                              elevation: 0, // remove shadow on Android
                              shadowOpacity: 0, // remove shadow on iOS

                           },
                           headerTintColor: 'black',
                           title: 'Manage Offers',

                           headerLeft: (

                                    <View style={{ paddingHorizontal: 20 }}>
                                    <Icon name="menu" type='feather' size={25} onPress={() => navigation.openDrawer()}/>
                                    </View>

                                    ),



                         }),
             },

DeliveryPartners:{

          screen:DeliveryPartners,
             navigationOptions:({ navigation }) => ({
                               headerStyle: {
                                 backgroundColor: '#ffc44d',

                               },
                               headerTintColor: 'black',
                               title: 'Delivery Partners',

                               headerLeft: (

                                        <View style={{ paddingHorizontal: 20 }}>
                                        <Icon name="menu" type='feather' size={25} onPress={() => navigation.openDrawer()}/>
                                        </View>

                                        ),
                               headerRight:(
                                        <View style={{ paddingHorizontal: 20 ,marginBottom:5}}>
                                        <Icon name="search" type='font-awesome'  size={25} onPress={() => navigation.openDrawer()}/>
                                        </View>

                                         )

                             }),
                             },
Support:{

          screen:Support,
             navigationOptions:({ navigation }) => ({
                               headerStyle: {
                                 backgroundColor: '#ffc44d',

                               },
                               headerTintColor: 'black',
                               title: 'Support Requests',

                               headerLeft: (

                                        <View style={{ paddingHorizontal: 20 }}>
                                        <Icon name="menu" type='feather' size={25} onPress={() => navigation.openDrawer()}/>
                                        </View>

                                        ),
                               headerRight:(
                                        <View style={{ paddingHorizontal: 20 ,marginBottom:5}}>
                                        <Icon name="search" type='font-awesome'  size={25} onPress={() => navigation.openDrawer()}/>
                                        </View>

                                         )

                             }),
                             },
OrderHistory:{

          screen:OrderHistory,
             navigationOptions:({ navigation }) => ({
                               headerStyle: {
                                 backgroundColor: '#ffc44d',

                               },
                               headerTintColor: 'black',
                               title: 'Order History',

                               headerLeft: (

                                        <View style={{ paddingHorizontal: 20 }}>
                                        <Icon name="menu" type='feather' size={25} onPress={() => navigation.toggleDrawer()}/>
                                        </View>

                                        ),
                               headerRight:(
                                        <View style={{ paddingHorizontal: 20 ,marginBottom:5}}>
                                        <Icon name="search" type='font-awesome'  size={25} onPress={() => navigation.toggleDrawer()}/>
                                        </View>

                                         )

                             }),
                             },
 Location:{

           screen:Location,
              navigationOptions:({ navigation }) => ({
                                headerStyle: {
                                  backgroundColor: '#ffc44d',

                                },
                                headerTintColor: 'black',
                                title: 'Partner Location',

                                headerLeft: (

                                         <View style={{ paddingHorizontal: 20 }}>
                                         <Icon name="menu" type='feather' size={25} onPress={() => navigation.toggleDrawer()}/>
                                         </View>

                                         ),


                              }),
                              },
ProcessingOrderDetails:{

           screen:ProcessingOrderDetails,
              navigationOptions:({ navigation }) => ({
                                headerStyle: {
                                  backgroundColor: '#ffc44d',

                                },
                                headerTintColor: 'black',
                                title: 'Partner Location',

                                headerLeft: (

                                         <View style={{ paddingHorizontal: 20 }}>
                                         <Icon name="arrow-back" type='MaterialIcons' size={25} onPress={() => navigation.toggleDrawer()}/>
                                         </View>

                                         ),


                              }),
                              },
OrderDetails:{

           screen:OrderDetails,
              navigationOptions:({ navigation }) => ({
                                headerStyle: {
                                  backgroundColor: '#ffc44d',

                                },
                                headerTintColor: 'black',
                                title: 'Order',

                                headerLeft: (

                                         <View style={{ paddingHorizontal: 20 }}>
                                         <Icon name="arrow-back" type='MaterialIcons' size={25} onPress={() => { this.props.navigation.goBack('Home') }} />
                                         </View>

                                         ),


                              }),
                              },


});

const drawNavigator= createDrawerNavigator({
Home:stackNavigator,
OffersHistory:stackNavigator,
AllItems:stackNavigator,
ActiveOffer:stackNavigator,
},
 DrawerConfig

);

const SwitchNavigator= createSwitchNavigator({
AuthLoading:AuthLoading,
Login:Login,
SignUp:SignUp,
Home:drawNavigator
});

export default createAppContainer(SwitchNavigator);
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center'
}
});