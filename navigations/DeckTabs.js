import React from 'react'
import { Platform } from 'react-native'
import Decks from '../components/Decks'
import AddDeck from '../components/AddDeck'
import { TabNavigator } from 'react-navigation'
import { white, purple } from '../styles/colors'

export default TabNavigator({
  Decks : {
    screen : Decks,
    navigationOptions : {
      tabBarLabel : 'Decks'
    }
  },
  AddDeck : {
    screen : AddDeck,
    navigationOptions : {
      tabBarLabel : 'New Deck'
    }
  }
},{
  navigationOptions : {
    header : null,
  },
  tabBarOptions : {
    ctiveTintColor : Platform.OS === 'ios' ? purple : white,
    style : {
      height : 56,
      backgroundColor : Platform.OS === 'ios' ? white : purple,
      shadowColor : 'rgba(0,0,0,0.24)',
      shadowOffset : {
        width : 0,
        height : 3
      },
      shadowRadius : 6,
      shadowOpacity : 1
    }
  }
});
