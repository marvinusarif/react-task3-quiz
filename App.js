import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, purple } from './styles/colors'
import thunk from 'redux-thunk'
import StatusBar from './components/StatusBar'
import { setLocalNotification } from './utils/helpers'

const DeckTabs = TabNavigator({
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
const MainNavigation = StackNavigator({
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
export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
        <View style={styles.container}>
          <StatusBar backgroundColor={purple} barStyle={`light-content`} />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
