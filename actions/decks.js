import moment from 'moment'
import { FETCH_DECKS, ADD_DECK, ADD_CARD, COMPLETE_QUIZ } from './'
import { fetchDecksFromStorage,
  storeDeckToStorage,
  storeCardtoDeckStorage,
  updateDeckStorage } from '../utils/api'
import uuid from 'uuid/v4'

export const fetchDecks = () => dispatch => {
  fetchDecksFromStorage()
    .then( decks => dispatch(receiveDecks(decks)))
}

export const receiveDecks = (decks) => {
  return {
    type : FETCH_DECKS,
    payload : {
      decks
    }
  }
}
export const postDeck = ({title}) => dispatch => {
  const entry = {
    deckId : uuid(),
    title,
    questions : [],
    lastTaken : null,
    lastScore : 0,
    createdAt : moment().format('DD/MM/YYYY')
  }
  storeDeckToStorage(entry).then( () => dispatch(addDeck(entry)))
}
export const addDeck = (deck) => {
  return {
    type : ADD_DECK,
    payload : {
      deck
    }
  }
}

export const storeCard = (deckId, card) => dispatch => {
  storeCardtoDeckStorage(deckId,card)
    .then(() => dispatch(addCard(deckId, card)))
}

export const addCard = (deckId, card) => {
  return {
    type : ADD_CARD,
    payload : {
      deckId,
      card
    }
  }
}

export const updateDeckScore = (deckId, updatedValue) => dispatch => {
  updateDeckStorage(deckId,updatedValue)
   .then(() => dispatch(updateDeck(deckId,updatedValue)))
}

export const updateDeck = (deckId, { lastScore, lastTaken}) => {
  return {
    type : COMPLETE_QUIZ,
    payload : {
      deckId,
      lastScore,
      lastTaken
    }
  }
}
