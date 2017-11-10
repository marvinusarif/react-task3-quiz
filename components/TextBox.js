import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { red } from '../styles/colors'

export default TextBox = ({header, input : {onChange, ...inputs}, meta : { touched, error } }) => {
  return (
    <View>
      <Text style={{fontSize : 30, textAlign : 'center', marginTop : 20}}>{header}</Text>
      <TextInput style={{marginTop : 10}} onChangeText={onChange} {...inputs}/>
      { touched && error && (
        <Text style={{color : red}}>{error}</Text>
      )}
    </View>
  )
}
