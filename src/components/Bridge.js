'use strict';

import React from 'react';
import ReactNative from 'react-native';
import hueApi from './jshue';
import Icon from 'react-native-vector-icons/Ionicons';

var {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage
} = ReactNative;


var Bridge = React.createClass({
  getInitialState() {
    return {
        hue: hueApi.bind(null, XMLHttpRequest, JSON)()
    };
  },
  componentDidMount: function() {
    this.searchBridge();
  },
  searchBridge: function() {
    const _this = this;
    this.state.hue.discover(
      function(bridges) {
          if(bridges.length === 0) {
              _this.setState({found: false});
          }
          else {
              _this.setState({found: true, brideIp: bridges[0].internalipaddress});
          }
      },
      function(error) {
          console.log(error);
      }
    );
  },
  connectBridge: function() {
    var bridge = this.state.hue.bridge(this.state.brideIp);
    var _this = this;
    bridge.createUser('HueLovers', function(data) {
        // save ip and user
       AsyncStorage.setItem('ip', _this.state.brideIp).then((value) => {
         AsyncStorage.setItem('user', data[0].success.username).then((value) => {
           _this.props.onPress();
         });
       });
    },
    function(error) {
        console.log(error);
    });
  },
  render() {
    return (
      <View style={[styles.modalView]}>
        {this.state.found ?  <Icon style={[styles.iconMsg]} name="ios-happy" size={120} color="#34495e" /> :  <Icon style={[styles.iconMsg]} name="ios-sad" size={120} color="#34495e" /> }
        <Text numberOfLines={3} style={[styles.infoText]}>{this.state.found ? 'Please push the button bridge to synchronize' : 'No bridge found  \n \n Make sure wifi is enable'  } </Text>
        <TouchableHighlight
          onPress={this.state.found ? this.connectBridge : this.searchBridge}
          style={[styles.button, styles.modalButton]}
          underlayColor="#34495e"
          >
          <Text style={[styles.buttonText]}> {this.state.found ? 'Connect'  : 'Search again' }</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Bridge;


var styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  button: {
    padding: 4,
    height: 44,
    overflow: 'hidden',
    backgroundColor: '#34495e'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    width: 300
  },
  infoText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    width: 300
  },
  modalButton: {
   position:'absolute',
   bottom: 0
  },
  iconMsg: {
    marginBottom: 30,
  }
});
