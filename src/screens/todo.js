import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

class Todo extends Component {
 constructor(){
 super();
 this.state={
 isLoading:true,
 dataSource:[]

 }
}

componentDidMount(){
const num =this.props.navigation.state.params.num;
fetch('https://jsonplaceholder.typicode.com/todos?userId='+ num).then((response)=>response.json())
.then((responseJson)=>{
this.setState({
isLoading:false,
dataSource:responseJson

})
})
}

_renderItem=({item})=>(


<View style={styles.container}>
<View style={{borderLeftWidth:3, borderLeftColor: item.completed==true ? "#7fff00" : "#f08080"}}>
<Text style={{fontSize:20, fontWeight:"bold", padding:5}} >Id:{item.id}</Text>
<Text style={{fontSize:20, fontWeight:"bold",  padding:5}} >Title:{item.title}</Text>



</View>
</View>


);

render(){
if(this.state.isLoading){
return(
<View style={styles.container}>
<ActivityIndicator size="large" color="#0000ff"/>
</View>
)
}
else{
return(

<View style={styles.container}>

<FlatList

data={this.state.dataSource}
renderItem={this._renderItem}

keyExtractor={(item,index)=>index.toString()}

/>


</View>

);
}
}
}
export default Todo;

const styles = StyleSheet.create({
  container: {

       flex: 1,
         padding:5,
       borderBottomWidth:3,
       borderBottomColor:"black",


  }
});