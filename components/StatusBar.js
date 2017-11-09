import React from 'react'
import { View, StatusBar as ReactStatusBar} from 'react-native'
import { Constants } from 'expo'

export default function StatusBar({ backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height : Constants.StatusBarHeight}}>
      <ReactStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
