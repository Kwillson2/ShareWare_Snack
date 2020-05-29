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
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const DeviceWidth = Dimensions.get('window').width;

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const SECTIONS = [
    {
        title: 'First',
        content: BACON_IPSUM,
    },
];


export default class ContentPane_Accordian extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        activeSections: [],
    };

    _renderSectionTitle = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader(section, index, isActive, sections) {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
            <Text style={styles.headerText}>{section.title}</Text>
          </Animatable.View>
        );
      }
     
      _renderContent(section, i, isActive, sections) {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
            <Animatable.Text
              duration={300}
              easing="ease-out"
              animation={isActive ? 'zoomIn' : false}>
              {section.content}
            </Animatable.Text>
          </Animatable.View>
        );
      }

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                // renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        backgroundColor: 'green',
        width: DeviceWidth * 0.3,
        height: DeviceWidth * 0.3,
        marginBottom: 1,
        marginLeft: 1,
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        width: DeviceWidth * 0.25,
        height: DeviceWidth * 0.25,
        backgroundColor: 'yellow',
    },
    lowerText: {
        textAlign: "center",

    },
});
