import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  AsyncStorage,
  Modal
} from 'react-native';

import Bulb from './Bulb';
import Reload from './Reload';
import Palette from './Palette';
import Bridge from './Bridge';
import HueApi from './jshue'; 
import ColorConvert from 'color-convert';
 
var ReactNativeHue = React.createClass({
  getInitialState: function() {
    return {
      hue: HueApi.bind(null, XMLHttpRequest, JSON)(),
      palette: {name:'', creator:'', colors: []},
      modalVisible: false
    };
  },
  componentWillMount: function() {
    AsyncStorage.getItem("lastPalette").then((value) => {
        if (value){ 
          this.setState({palette: JSON.parse(value)});
        } else {
          this.setState({palette: {name:'Giant Goldfish', creator:'By manekineko', colors: ['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900']}});
        }
    }).done();
  }, 
  componentDidMount: function(){
    this.connectToBridge();
  },  
  changePalette: function(palette) { 
       this.refs.BULB0.animate(0, palette.colors[0]);
       this.refs.BULB1.animate(200, palette.colors[1]); 
       this.refs.BULB2.animate(400, palette.colors[2]);  
       this.refs.BULB3.animate(600, palette.colors[3]); 
       this.refs.BULB4.animate(800, palette.colors[4]); 
       this.setState({palette: palette}); 
       AsyncStorage.setItem('lastPalette', JSON.stringify(palette));
       this.changeLights();    
  },
  _setModalVisible(visible) {
    this.connectToBridge();
    this.setState({modalVisible: visible});
  },
  connectToBridge: function() {
    const _this = this;
    AsyncStorage.getItem("ip").then((ipBride) => {
      AsyncStorage.getItem("user").then((userName) => {
        if (ipBride && userName) { 
          const bridge = this.state.hue.bridge(ipBride);
          const user = bridge.user(userName);
          _this.setState({userName: userName, ip: ipBride, user: user});
          _this.changeLights();
        } else {
          this.setState({modalVisible: true});
        }
      }).done();
    }).done();
  },
  changeLights: function() {
    const _this = this;
    this.state.palette.colors.map(function(item, i) {
      const HSL = ColorConvert.hex.hsl(item);
      _this.state.user.setLightState(i+1, { on: true, sat: HSL[1], bri: HSL[2], hue: (HSL[0] * 257)}, function(data) {console.log(data)}, function(err) {console.log(err)});
    })
  },
  turnLight: function(index, state) {
    this.state.user.setLightState(index + 1, { on: state}, function(data) {console.log(data)}, function(err) {console.log(err)});
  },
  render: function() {
    return (
     <View style={styles.body}>
       
       <View style={styles.header}>
         <Reload palette={this.state.palette} changePalette={this.changePalette} />
       </View> 
       
       <View style={styles.content}>
         {this.state.palette.colors.map(function(item, i) {
          return (
            <Bulb turnLight={this.turnLight}  index={i} key={i} title={item} ref={'BULB' + i} color={item} text={'Ag'} />
          );
        }, this)}
        </View> 
        
       <View style={styles.footer}>
         <Palette colors={this.state.palette.colors}/>
         <Text numberOfLines={1} style={{fontWeight: '800', color: '#000', fontSize: 25, padding: 4}}>
           {this.state.palette.name}
         </Text> 
         <Text numberOfLines={1} style={{fontWeight: '800', color: '#ccc', fontSize: 13}}>
           {this.state.palette.creator}
         </Text>
       </View>
     
      <Modal 
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container]}>
            <View style={[styles.innterContainer]}>
              <Bridge
                onPress={this._setModalVisible.bind(this, false)}>
              </Bridge>
             </View>
          </View>
        </Modal>
     </View>
    );
  }
});

AppRegistry.registerComponent('ReactNativeHue', () => ReactNativeHue);

var styles = StyleSheet.create({  
  content: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center', 
    flex: 1
  },
  header: {
    alignItems: 'center',
    padding: 60      
  }, 
  body: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    justifyContent: 'space-around', 
  },
  footer: {
    alignItems: 'center',
    padding: 60    
  },
   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innterContainer: { 
    backgroundColor: '#F8F8F8',
    height: 150,
    alignItems:'center',
    justifyContent: 'center' 
  }
}); 


