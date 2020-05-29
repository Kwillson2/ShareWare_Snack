import * as React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  Switch,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements'
import * as Font from 'expo-font';
import PropTypes from 'prop-types'

import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
// import firebase from 'react-native-firebase';
import * as FirebaseManager from "../../../storage/FirebaseManager";
import { logoutUser } from "../../firebase-login/api/auth-api";

const OptionsScreenContent = {
  ABOUT_US: {
    textContent: "About ShareWare... We are awesome",
    title: "About ShareWare",
  },
  TERMS_POLICIES: {
    textContent: "ShareWare Terms and Policies",
    title: "Terms and Policies",
  },
  SHARE_US: {
    textContent: "Share ShareWare... We are awesome",
    title: "Share ShareWare",
  },
  RATE_US: {
    textContent: "Rate ShareWare... We are awesome",
    title: "Rate ShareWare",
  },
  SEND_FEEDBACK: {
    textContent: "Send Feedback",
    title: "Send feedback... to make us more awesome",
  },
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

class SettingsScreen extends React.Component {
  // static propTypes = {
  //   avatar: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   navigation: PropTypes.object.isRequired,
  //   emails: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       email: PropTypes.string.isRequired,
  //     })
  //   ).isRequired,
  // }

  state = {
    pushNotifications: true,
  }

  onPressOptions = (content_) => {
    this.props.navigation.navigate('Options', content_)
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }

  render() {
    // const { avatar, name, emails: [firstEmail] } = this.props
    // const { avatar, name } = this.props
    const avatar = FirebaseManager.GetCurUser().getPhotoUrl();
    const name = FirebaseManager.GetCurUser().getName();

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          {/* 
          <View style={styles.modules}>
            <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
            {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
            {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
            {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
            {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
            {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
            {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
            {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
            {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
            {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
            {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
            {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
            {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
            {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
            {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
          </View> */}

          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {/* {firstEmail.email} */}
            </Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
          <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={this.onChangePushNotifications}
                value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'Ionicons',
                  name: 'md-notifications',
                }}
              />
            }
          />
          {/* <ListItem
            // chevron
            title="Currency"
            rightTitle="USD"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'FontAwesome',
                  name: 'money',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Location"
            rightTitle="New York"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'MaterialIcons',
                  name: 'place',
                }}
              />
            }
            rightIcon={<Chevron />}
          /> */}
          {/* <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'MaterialIcons',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          /> */}
        </View>
        <InfoText text="More" />
        <View>
          <ListItem
            title="About US"
            onPress={() => this.onPressOptions(OptionsScreenContent.ABOUT_US)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'Ionicons',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            onPress={() => this.onPressOptions(OptionsScreenContent.TERMS_POLICIES)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'Entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            onPress={() => this.onPressOptions(OptionsScreenContent.SHARE_US)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'Entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            onPress={() => this.onPressOptions(OptionsScreenContent.RATE_US)}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 5,
              textStyle: { color: 'white' },
              containerStyle: { backgroundColor: 'white', marginTop: 0 },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'Entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            onPress={() => this.onPressOptions(OptionsScreenContent.SEND_FEEDBACK)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'MaterialIcons',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Logout"
            onPress={() => FirebaseManager.logoutUser()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'red',
                }}
                icon={{
                  type: 'MaterialCommunityIcons',
                  name: 'logout',
                }}
              />
            }
          // rightIcon={<Chevron />}
          />


        </View>
      </ScrollView>
    )
  }
}

export default SettingsScreen
