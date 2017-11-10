import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import StatusBar from './components/StatusBar'
import { setLocalNotification } from './utils/helpers'
import MainNavigation from './navigations/MainNavigation'
import { purple } from './styles/colors'

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
