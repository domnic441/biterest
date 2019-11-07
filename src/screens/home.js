import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,

} from "react-native";
import { Button } from 'react-native-elements';


class Home extends Component{
render(){
return(
<View style={styles.container}>
  <StatusBar

          backgroundColor="#ffcf40"
        />

<Button
  buttonStyle={{width:100, height:40, }}
  onPress={()=>this.props.navigation.navigate('Task1')}
  title="Task1"
/>

<Button
  buttonStyle={{width:100, height:40}}
  onPress={()=>this.props.navigation.navigate('Task2')}
  title="Task2"
/>

<Button
 buttonStyle={{width:100, height:40}}
  onPress={()=>this.props.navigation.navigate('Task3')}
  title="Task3"

/>
</View>

);
}
}



export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"space-around",
     padding:200

    },


});