import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Bulb from './Bulb';
import Reload from './Reload';
import Palette from './Palette';

var ReactNativeHue = React.createClass({
  getInitialState: function() {
    return {
      palette: {name:'', creator:'', colors: []}
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
  changePalette: function(palette) {
       this.refs.BULB0.animate(0, palette.colors[0]);
       this.refs.BULB1.animate(200, palette.colors[1]); 
       this.refs.BULB2.animate(400, palette.colors[2]);  
       this.refs.BULB3.animate(600, palette.colors[3]); 
       this.refs.BULB4.animate(800, palette.colors[4]); 
       this.setState({palette: palette}); 
       AsyncStorage.setItem('lastPalette', JSON.stringify(palette));         
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
            <Bulb key={i} title={item} ref={'BULB' + i} color={item} text={'Ag'} />
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
  }
});