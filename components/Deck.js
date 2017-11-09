import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { lightPurp, blue, purple, red } from '../styles/colors'

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title : navigation.state.params.title
    }
  }

  render () {
    const { navigation } = this.props
    const { deckId, title, questions, lastScore, lastTaken, createdAt } = this.props.deck
    return (
      <View style={styles.container}>
        <Text style={{fontSize : 40}}>{title}</Text>
        <Text style={{fontSize : 30}}>{questions.length} Cards</Text>
        <Text style={{fontSize : 20, color : purple}}>Last Score : {lastScore}</Text>
        <Text style={{fontSize : 15, color : red}}>Completed At : { lastTaken ? `(${lastTaken})` : 'none'}</Text>
        <Text style={{fontSize : 15}}>Created At : {createdAt}</Text>
        <TouchableOpacity style={styles.addCardBtn} onPress={() => navigation.navigate('AddCard',{
          deckId,
          title
        })}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startQuizBtn} onPress={() => navigation.navigate('Quiz',{
          deckId,
          title
        })}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps ({decks}, {navigation}) {
  const deckId = navigation.state.params.deckId
  return {
    deck : decks.items[deckId]
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  addCardBtn : {
    backgroundColor : blue,
    margin : 20,
    padding : 40,
    alignItems : 'center',
  },
  startQuizBtn : {
    backgroundColor : lightPurp,
    padding : 40,
    alignItems : 'center'
  }
})
export default connect(mapStateToProps)(Deck)
