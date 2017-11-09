import { combineReducers } from 'redux'
import decks from './decks'
import { reducer as form } from 'redux-form'

export default combineReducers({
  form,
  decks
})
