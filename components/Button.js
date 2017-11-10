import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'

export default Button = ({onPress, style, textColor, text}) => {
  return (<View>
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{
          color: textColor
        }}>{text}</Text>
    </TouchableOpacity>
  </View>)
}
