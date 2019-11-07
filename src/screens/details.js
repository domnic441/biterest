import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";


class Details extends Component {
render(){

const item =this.props.navigation.state.params.item;
return(

<View style={styles.container}>
<Text style={{color:"#ff4500", fontSize:25}}>Name</Text>
<Text style={styles.item}>{item.name}</Text>
<Text style={{color:"#ff4500", fontSize:25}}>Address</Text>
<Text style={styles.item}>{item.address.street}</Text>
<Text style={styles.item}>{item.address.suite}</Text>
<Text style={styles.item}>{item.address.city}</Text>
<Text style={styles.item}>{item.address.zipcode}</Text>
</View>

);
}
}

export default Details;

const styles = StyleSheet.create({
  container: {

    flex: 1,
marginTop:40,
  },
  item:{

 fontWeight:"bold",
 fontSize:25
  }
});