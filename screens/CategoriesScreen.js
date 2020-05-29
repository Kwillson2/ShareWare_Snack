import * as React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createAppContainer, Header } from 'react-navigation';
import CategoryTile from '../components/CategoryTile';
import { createStackNavigator } from 'react-navigation-stack';
import Header_ImageTitleImage from '../components/Header_ImageTitleImage';
import * as Setup from '../Setup';
var __DEV__ = true;

const DeviceWidth = Dimensions.get('window').width;



class LogoTitle extends React.Component {

  render(props) {
    return (
      <TouchableOpacity onPress={this.props.onPressHandler}>
        <Image
          source={require('../assets/images/appImages/back_arrow_empty.png')}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    );
  }
}


export default class CategoriesScreen extends React.Component {


  static onUserProfilePress = () => {
    console.log("CategoriesScreen.onUserProfilePress():");
    this.props.navigation.navigate('UserProfile');
  }

  onHistoryPress = () => {
    console.log("CategoriesScreen.onHistoryPress():");
    this.props.navigation.navigate('ScanHistory');
  }
  static onBackImgPress() {
    console.log("CategoriesScreen.onBackImgPress():");
    this.props.navigation.navigate.goBack();
  }

  static navigationOptions = ({ navigate }) => {
    return {
      headerTitle: () => <LogoTitle onPressHandler={() => navigate.goBack()} />,
      headerRight: () => (
        <Button
          onPress={() => console.log("PRESSED")}
          title="+1"
          color="#fff"
        />
      ),
    };
  };


  // componentDidMount() {
  //   this.props.navigation.setParams({ navigate: this.navigation });
  // }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.flexTest1}>
          </View>
          <View style={styles.flexTest2}>
            <ScrollView             
            horizontal= {true}
            contentContainerStyle={styles.categoryButtonScrollView}>
                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"HISTORY"}
                  imgSrc={Setup.BUTTON_PATHS.history}
                  onPressAction={this.onHistoryPress} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"EVENTS"}
                  imgSrc={Setup.BUTTON_PATHS.events}
                  onPressAction={this.props.navigation.navigate('Events')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"WARDROBE"}
                  imgSrc={Setup.BUTTON_PATHS.wardrobe}
                  onPressAction={this.props.navigation.navigate('Wardobe')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"CONTACTS"}
                  imgSrc={Setup.BUTTON_PATHS.contacts}
                  onPressAction={this.props.navigation.navigate('Contacts')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"RECYCLED"}
                  imgSrc={Setup.BUTTON_PATHS.recycled}
                  onPressAction={this.props.navigation.navigate('Recylced')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"INSTRUCTIONS"}
                  imgSrc={Setup.BUTTON_PATHS.instructions}
                  onPressAction={this.props.navigation.navigate('Instructions')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"INVENTORY"}
                  imgSrc={Setup.BUTTON_PATHS.inventory}
                  onPressAction={this.props.navigation.navigate('Inventory')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"RECEIPTS"}
                  imgSrc={Setup.BUTTON_PATHS.reciepts}
                  onPressAction={this.props.navigation.navigate('Receipts')} />

                <CategoryTile
                  // style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, }}
                  tileName={"POSTAGE"}
                  imgSrc={Setup.BUTTON_PATHS.postage}
                  onPressAction={this.props.navigation.navigate('Postage')} />

                <CategoryTile
                  tileName={"menu"}
                  imgSrc={Setup.BUTTON_PATHS.menu}
                  onPressAction={this.props.navigation.navigate('menu')} />

                <CategoryTile
                  tileName={"audio"}
                  imgSrc={Setup.BUTTON_PATHS.audio}
                  onPressAction={this.props.navigation.navigate('audio')} />

                <CategoryTile
                  tileName={"video"}
                  imgSrc={Setup.BUTTON_PATHS.video}
                  onPressAction={this.props.navigation.navigate('video')} />

                <CategoryTile
                  tileName={"homeLog"}
                  imgSrc={Setup.BUTTON_PATHS.homeLog}
                  onPressAction={this.props.navigation.navigate('homeLog')} />

                <CategoryTile
                  tileName={"bar"}
                  imgSrc={Setup.BUTTON_PATHS.bar}
                  onPressAction={this.props.navigation.navigate('bar')} />

                <CategoryTile
                  tileName={"maintenance"}
                  imgSrc={Setup.BUTTON_PATHS.maintenance}
                  onPressAction={this.props.navigation.navigate('maintenance')} />

                <CategoryTile
                  tileName={"mysteryBox"}
                  imgSrc={Setup.BUTTON_PATHS.mysteryBox}
                  onPressAction={this.props.navigation.navigate('mysteryBox')} />

                <CategoryTile
                  tileName={"blank"}
                  imgSrc={Setup.BUTTON_PATHS.blank}
                  onPressAction={this.props.navigation.navigate('blank')} />

            </ScrollView>
          </View>
          <View style={styles.flexTest3} />
        </View>
      </>
    );
  }


}


const styles = StyleSheet.create({
  categoryButtonScrollView: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'teal',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  flexTest1: {
    flexDirection: 'row',
    flex: 2,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  flexTest2: {
    width: DeviceWidth,
    flex: 8,
    backgroundColor: 'red',
  },
  flexTest3: {
    flex: 2,
    backgroundColor: 'orange',
  },
  titleText: {
    flex: 1,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
    // marginTop: '15%',
  },
});
