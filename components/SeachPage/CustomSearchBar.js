import React from 'react';
import {View,TextInput,StyleSheet,Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default class CustomSearchBar extends React.Component {
  state = {
    search:""
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Username" onChangeText={(value)=>this.setState({search:value})} value={this.state.search}/>
        <Button title="Search" onPress={()=>this.props.handleSubmit(this.state.search)}    />
      </View>
    );
  }
}