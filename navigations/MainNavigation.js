import React from 'react'
import { StackNavigator } from 'react-navigation'
import Deck from '../components/Deck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
import DeckTabs from '../navigations/DeckTabs'
import { white, purple } from '../styles/colors'

export default StackNavigator({
  Home : {
    screen : DeckTabs
  },
  Deck : {
    screen : Deck,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : purple
      }
    }
  },
  AddCard : {
    screen : AddCard,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : purple
      }
    }
  },
  Quiz : {
    screen : Quiz,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : purple
      }
    }
  }
})
