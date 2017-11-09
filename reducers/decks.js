import _ from 'lodash'
import { FETCH_DECKS, ADD_DECK, ADD_CARD, COMPLETE_QUIZ } from '../actions'

/*
items : {
  item_id : {
    title : "learn react",
    questions : 8
    lastTaken : 2017-08-11,
    lastScore : 0
  }, ...
}
*/
const initialState = {
  items : {}
}

export default function (state=initialState,action) {
  switch(action.type) {
    case FETCH_DECKS :
    const decks = _.reduce(action.payload.decks, (decks,{deckId, ...deck}) => {
      decks[deckId] = {
        deckId,
        ...deck
      }
      return decks
    },{})
      return {
        ...state,
        items : {
          ...decks
        }
      }
    case ADD_DECK :
      return {
        ...state,
        items : {
          ...state.items,
          [action.payload.deck.deckId] : action.payload.deck
        }
      }
    case ADD_CARD :
      return {
        ...state,
        items : {
          ...state.items,
          [action.payload.deckId] : {
            ...state.items[action.payload.deckId],
            questions : state.items[action.payload.deckId].questions.concat(action.payload.card)
        }
      }
    }
    case COMPLETE_QUIZ :
      return {
        ...state,
        items : {
          ...state.items,
          [action.payload.deckId] : {
            ...state.items[action.payload.deckId],
            lastScore : action.payload.lastScore,
            lastTaken : action.payload.lastTaken
        }
      }
    }
    default :
      return state
  }
}
