import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { PinchGestureHandler } from 'react-native-gesture-handler';


const { width: winWidth, height: winHeight } = Dimensions.get('window')


export default function CameraComponent() {
  camera = null;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    console.log("if (hasPermission === null) ");
    return <View />;
  }
  if (hasPermission === false) {
    console.log("if (hasPermission === false) ");
    return <Text>No access to camera</Text>;
  }


  const snap = async () => {
    if (this.camera) {
      // let photo = await this.camera.takePictureAsync();
    }
  };

  const onPinchGestureEvent = event => {
    console.log(event.nativeEvent.scale);
    // this.camera.zoom = 1;
  }


  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
    >
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={ref => {
          this.camera = ref;
        }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>

            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                async () => {
                  if (this.camera) {
                    let photo = await this.camera.takePictureAsync();
                  }
                };
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </PinchGestureHandler>
  );

}

StyleSheet.create({
  preview: {
      height: winHeight,
      width: winWidth,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
  },
});