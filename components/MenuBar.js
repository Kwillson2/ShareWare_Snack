import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

var __DEV__ = true;
export default class MenuBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftButContainer}>
          <View style={styles.leftTopContainer}>
          </View>
          <View style={styles.listsContainer}>
            <TouchableOpacity
              onPress={this.props.listNav}
            >
              <View style={styles.listImageTouch}>
                <Image
                  source={
                    __DEV__
                      ? require('../assets/images/appImages/main/lists.png')
                      : require('../assets/images/appImages/main/lists.png')
                  }
                  style={styles.listImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightButContainer}>

          <View style={styles.openQrContainer}>
            <TouchableOpacity
              onPress={this.props.openQrNav}
              style={styles.openQrImage}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/appImages/main/open_qr.png')
                    : require('../assets/images/appImages/main/open_qr.png')
                }
                style={styles.openQrImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.saveQrContainer}>
            <TouchableOpacity
              onPress={this.props.saveQrNav}
              style={styles.saveQrImage}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/appImages/main/save_qr.png')
                    : require('../assets/images/appImages/main/save_qr.png')
                }
                style={styles.saveQrImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.pairQrContainer}>
            <TouchableOpacity
              onPress={this.props.pairQrNav}
              style={styles.pairQrImage}
              >
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/appImages/main/pair_qr.png')
                    : require('../assets/images/appImages/main/pair_qr.png')
                }
                style={styles.pairQrImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  leftButContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  rightButContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  leftTopContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  listsContainer: {
    flex: 2,
    backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // marginTop: '49.5%',
    // position: 'absolute',
  },
  pairQrContainer: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  saveQrContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  openQrContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  listImageTouch: {
    width: '100%',
    // bottom: 0,
    backgroundColor: 'teal',
    // flex: 1,
    // resizeMode: 'contain',
    // marginTop: '49.5%',
  },
  listImage: {
    height: '100%',
    // bottom: 0,
    // flex: 1,
    resizeMode: 'contain',
    // marginTop: '49.5%',
  },
  openQrImage: {
    bottom: 0,
    height: '100%',
    resizeMode: 'contain',
    // flex: 1,
  },
  pairQrImage: {
    bottom: 0,
    height: '100%',
    resizeMode: 'contain',
    // flex: 1,
  },
  saveQrImage: {
    bottom: 0,
    height: '100%',
    resizeMode: 'contain',
    // flex: 1,
  },
});
