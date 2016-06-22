import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  DrawerLayoutAndroid
} from 'react-native';
import ReactNativeView from './App';
import Starred from './Starred';
import Icon from 'react-native-vector-icons/FontAwesome';

var ReactNativeHue = React.createClass({
  getInitialState: function() {
    return {
      currentView: 'home'
    };
  },
  openDrawer: function(palette) {
    this.refs['DRAWER_REF'].openDrawer();
  },
  goHome: function() {
    this.setState({currentView:'home'});
    this.refs['DRAWER_REF'].closeDrawer();
  },
  goFavoris: function() {
    this.setState({currentView:'favoris'});
    this.refs['DRAWER_REF'].closeDrawer();
  },
  selectStar: function(paletteStar) {
    this.setState({paletteStar: paletteStar});
    this.setState({currentView:'home'});
  },
  render: function() {
    var navigationView = (
      <View style={[styles.layout]}>
        <View style={[styles.header]}>
          <View style={[styles.headerIcon]}>
            <Icon name="lightbulb-o" size={60} color="#f1c40f" />
          </View>
        </View>
        <Icon.Button style={[styles.menuItem]} name="home"  color='#455A64' backgroundColor="#fff" onPress={this.goHome} borderRadius={0}>
          <Text style={[styles.textItem]}>Home</Text>
        </Icon.Button>
        <Icon.Button style={[styles.menuItem]} name="star"  color='#455A64' backgroundColor="#fff" onPress={this.goFavoris} borderRadius={0}>
          <Text style={[styles.textItem]}>Starred</Text>
        </Icon.Button>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER_REF'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        {this.state.currentView == 'home' ? <ReactNativeView paletteStar={this.state.paletteStar} openMenu={this.openDrawer}/> : <Starred selectStar={this.selectStar} /> }
      </DrawerLayoutAndroid>
    );
  }
});

AppRegistry.registerComponent('ReactNativeHue', () => ReactNativeHue);


var styles = StyleSheet.create({
  headerIcon: {
    borderColor: '#f1c40f',
    borderWidth: 3,
    borderRadius: 50,
    width: 75,
    height:  75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layout: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#E3ECF5',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection:'row',
    paddingLeft: 16,
    paddingTop: 16
  },
  textItem: {
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 16,
    color: '#455A64'
  }
});
