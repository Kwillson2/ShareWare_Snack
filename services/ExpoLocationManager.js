import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

export async function RegisterBackgroundLocation(callback) {
    console.log(`ExpoLocationManager.RegisterBackgroundLocation(): Registering for location updates`);
    UPDATE_CALLBACK_ARR.push(callback);
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
        console.log(`ExpoLocationManager.RegisterBackgroundLocation(): Location Granted`);
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
        });
        // console.log(`ExpoLocationManager.RegisterBackgroundLocation(): After location request`);
    }
    else {

        console.log(`ExpoLocationManager.RegisterBackgroundLocation(): ERROR: Location permission denied`);
    }

}

const UPDATE_CALLBACK_ARR = [];

export async function OnLocationUpdated(locations) {
    // console.log(`ExpoLocationManager.OnLocationUpdated(): Top`);
    if (UPDATE_CALLBACK_ARR.length > 0) {
        // console.log(`ExpoLocationManager.OnLocationUpdated(): Calling the Update callbacks`);
        for (let iCalls = 0; iCalls < UPDATE_CALLBACK_ARR.length; iCalls++) {
            const element = UPDATE_CALLBACK_ARR[iCalls];
            element(locations);
        }
    }
}

export class ExpoLocationManager extends React.Component {
    onPress = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.Balanced,
            });
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Text>Enable background location</Text>
            </TouchableOpacity>
        );
    }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const { locations } = data;
        // do something with the locations captured in the background

        // console.log(`ExpoLocationManager.defineTask(): Locations received: ${JSON.stringify(locations)}`);
        OnLocationUpdated(locations);
    }
});
