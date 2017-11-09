import moment from 'moment'
import _ from 'lodash'
import uuid from 'uuid/v4'
import { AsyncStorage } from 'react-native'
import { APP_STORAGE_KEY, NOTIFICATION_STORAGE_KEY } from '../actions/const'
import { Notifications, Permissions } from 'expo'

function createDummyData() {
  const rawDummyData = [{
    deckId : uuid(),
    title : 'React Native',
    questions : [{
      question : 'What is React?',
      answer : 'A library for managing user interfaces'
    }, {
      question : 'Where do you make Ajax requests in React?',
      answer : 'The componentDidMount lifecycle event'
    }],
    lastTaken : null,
    lastScore : 0,
    createdAt : moment().format('DD/MM/YYYY')
  },{
    deckId : uuid(),
    title : 'Javascript',
    questions : [{
      question : 'What is a closure?',
      answer : 'The combination of a function and the lexical environment within which that function was declared.'
    }],
    lastTaken : null,
    lastScore : 0,
    createdAt : moment().format('DD/MM/YYYY')
  }]
  const dummyData = _.mapKeys(rawDummyData, 'deckId')

  AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatDecks(rawDecks) {
  return rawDecks === null ? createDummyData() : JSON.parse(rawDecks)
}

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then( (data) => {
      if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then( ({status}) => {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(18)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              {
                  title : 'quiz reminder',
                  body : `Don't forget to take a quiz for today!`,
                  android : {
                    sound : false,
                    sticky : false,
                    vibrate : false
                  }
              },
              {
                time : tomorrow,
                repeat : 'day'
              })
            AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
           })
      }
    })
}
