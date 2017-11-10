import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'
import { postDeck } from '../actions/decks'
import { red, blue, white } from '../styles/colors'
import uuid from 'uuid/v4'

const renderInput = ({ input : {onChange, ...inputs}, meta : { touched, error } }) => {
  return (
    <View>
      <TextInput onChangeText={onChange} {...inputs}/>
      { touched && error && (
        <Text style={{color : red}}>{error}</Text>
      )}
    </View>
  )
}
class AddDeck extends Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit({title}){
    const { postDeck, navigation, reset } = this.props
    const submittedValue = {
      deckId : uuid(),
      title
    }
    postDeck(submittedValue)
    navigation.navigate('Deck',submittedValue)
    reset()
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <View style={styles.container}>
        <Text style={{fontSize : 30, textAlign : 'center'}}>What is your deck title?</Text>
        <Field name='title' component={renderInput} />
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(this.submit)}>
          <Text style={{color : white}}>Create New Deck</Text>
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
  if(!values.title){
    errors.title = 'title could not be empty'
  }
  return errors
}

AddDeck = reduxForm({
  form : 'AddDeck',
  validate
})(AddDeck)

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    postDeck : (deck) => dispatch(postDeck(deck))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)
