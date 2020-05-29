import React from 'react'
import { View, Text } from 'react-native'

import { Nav } from '../components'

// const Options = (props) => {
export function Options(props) {
  // console.log(`Options(Profile3).Options(): Text: ${props.route.params.textContent}`);
  // console.log(`Options(Profile3).Options(): Props: ${JSON.stringify(props)}`);
  console.log(props.route.params.textContent);
  return (
    <View>
      <Text>
        {props.route.params.textContent}
      </Text>
    </View>
  )
};

export default Options

