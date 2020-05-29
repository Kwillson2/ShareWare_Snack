import * as React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createAppContainer, Header, Footer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
var __DEV__ = true;

export default class TestScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flex1}/>
        <View style={styles.flex2}/>
        <View style={styles.flex3}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  flex1: {
    flex: 1,
    backgroundColor: 'red',
  },
  flex2: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  flex3: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
