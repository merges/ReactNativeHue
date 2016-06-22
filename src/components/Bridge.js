'use strict';

import React from 'react';
import ReactNative from 'react-native';
import hueApi from './jshue';

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
      <View>
        <Text numberOfLines={1} style={[styles.buttonText]}>{this.state.found ? 'Please push the button bridge' : 'No bridge found :('  } </Text>
        <TouchableHighlight
          onPress={this.state.found ? this.connectBridge : this.searchBridge}
          style={[styles.button, styles.modalButton]}
          underlayColor="#a9d9d4">
          <Text style={[styles.buttonText]}> {this.state.found ? 'Connect'  : 'Search again' }</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Bridge;


var styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: '#a9d9d4',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    width: 300
  },
  modalButton: {
    marginTop: 10,
  },
});
