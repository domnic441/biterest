import React, { Component } from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Alert,YellowBox,StatusBar, DrawerLayoutAndroid
} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import Navigator from './src/navigation/navigator'

YellowBox.ignoreWarnings(['ViewPagerAndroid']);
export default class App extends Component {

render()
{
return (

<ViewPager style={{flex: 1}}>
<View>
    <StatusBar backgroundColor="#ffb82b" barStyle="dark-content"/>
  <Navigator/>
  </View>
 </ViewPager>




);
}
}


const styles = StyleSheet.create({
container: {
flex:1,
flexDirection:'column',
backgroundColor: '#fff'
}
});