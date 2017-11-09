import { APP_STORAGE_KEY } from '../actions/const'
import { AsyncStorage } from 'react-native'
import { formatDecks } from './helpers'

export const fetchDecksFromStorage = () => {
  //AsyncStorage.clear(APP_STORAGE_KEY, (err) => console.log(err))
  return AsyncStorage.getItem(APP_STORAGE_KEY).then(formatDecks)
}

export const storeDeckToStorage = ({...deck}) => {
  return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
    [deck.deckId] : deck
  }))
}
export const storeCardtoDeckStorage = (deckId, {question, answer }) => {

  return AsyncStorage.getItem(APP_STORAGE_KEY).then((rawDecks) => {
    const storedDecks = JSON.parse(rawDecks)
    storedDecks[deckId] = {
      ...storedDecks[deckId],
      questions : storedDecks[deckId].questions.concat({
        question,
        answer
      })
    }
    AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(storedDecks))
  })
}
export const updateDeckStorage = (deckId, { lastScore, lastTaken }) => {
  return AsyncStorage.getItem(APP_STORAGE_KEY).then((rawDecks) => {
    const storedDecks = JSON.parse(rawDecks)
    storedDecks[deckId] = {
      ...storedDecks[deckId],
      lastScore,
      lastTaken
    }
    AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(storedDecks))
  })
}
export const removeDeckFromStorage = (key) => {
  return AsyncStorage.getItem(APP_STORAGE_KEY)
    .then( (rawDecks) => {
      const storedDecks = JSON.parse(rawDecks);
      storedDecks[key] = undefined
      delete storedDecks[key]
      AsyncStorage.setItem(APP_STORAGE_KEY,JSON.stringify(storedDecks))
    })
}
