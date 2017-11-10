import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'
import { blue, white, red } from '../styles/colors'
import { storeCard } from '../actions/decks'

const renderInput = ({header, input : {onChange, ...inputs}, meta : { touched, error } }) => {
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
class AddCard extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title : `Add Card to ${navigation.state.params.title}`
    }
  }
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit(form){
    const { deckId, reset, storeCard, navigation} = this.props
    storeCard(deckId,form)
    navigation.goBack()
    reset()
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <View style={styles.container}>
        <Field name='question'
          component={renderInput}
          header={`What is Your Question ?`}/>
        <Field name='answer'
          component={renderInput}
          header={`What is Your Answer ?`}/>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(this.submit)}>
          <Text style={{color : white}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1,
    padding : 20,
    alignItems : 'stretch'
  },
  submitBtn : {
    alignSelf : 'center',
    marginTop : 20,
    backgroundColor : blue,
    padding : 10,
    alignItems : 'center'
  }
})

const validate = (values) => {
  const errors = {}
  if(!values.question){
    errors.question = 'question could not be empty'
  }
  if(!values.answer){
    errors.answer = 'answer could not be empty'
  }
  return errors
}

AddCard = reduxForm({
  form : 'AddCard',
  validate
})(AddCard)

function mapStateToProps(state, {navigation}){
  return {
    deckId : navigation.state.params.deckId
  }
}

function mapDispatchToProps(dispatch){
  return {
    storeCard : (deckId,card) => dispatch(storeCard(deckId,card))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
