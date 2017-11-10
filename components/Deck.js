import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { lightPurp, blue, purple, red, white } from '../styles/colors'

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title : navigation.state.params.title
    }
  }

  render () {
    const { navigation } = this.props
    if(!this.props.deck) {
      return <ActivityIndicator style={{marginTop: 30}}/>
    }
    const { deckId, title, questions, lastScore, lastTaken, createdAt } = this.props.deck
    return (
      <View style={styles.container}>
        <Text style={{fontSize : 40}}>{title}</Text>
        <Text style={{fontSize : 30}}>{questions && (questions.length)} Cards</Text>
        <Text style={{fontSize : 20, color : purple}}>Last Score : {lastScore}</Text>
        <Text style={{fontSize : 15, color : red}}>Completed At : { lastTaken ? `(${lastTaken})` : 'none'}</Text>
        <Text style={{fontSize : 15}}>Created At : {createdAt}</Text>
        <TouchableOpacity style={styles.addCardBtn} onPress={() => navigation.navigate('AddCard',{
          deckId,
          title
        })}>
          <Text style={{color : white}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startQuizBtn} onPress={() => navigation.navigate('Quiz',{
          deckId,
          title
        })}>
          <Text style={{color : white}}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps ({decks}, {navigation}) {
  const deckId = navigation.state.params.deckId
  return {
    deck : _.filter(decks.items, (deck) => {return deckId === deck.deckId}).pop()
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
