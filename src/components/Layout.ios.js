import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  TabBarIOS
} from 'react-native';
import ReactNativeView from './App';
import Starred from './Starred';
import Icon from 'react-native-vector-icons/Ionicons';

var ReactNativeHue = React.createClass({
  getInitialState: function() {
    return {
      currentView: 'home'
    };
  },
  selectStar: function(paletteStar) {
    this.setState({paletteStar: paletteStar});
    this.setState({currentView:'home'});
  },
  render: function() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue">
        <Icon.TabBarItemIOS
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              currentView: 'home',
            });
          }}>
          <ReactNativeView paletteStar={this.state.paletteStar}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Starred"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.currentView === 'favoris'}
          onPress={() => {
            this.setState({
              currentView: 'favoris'
            });
          }}>
          <Starred selectStar={this.selectStar} />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
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
