import moment from 'moment'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateDeckScore } from '../actions/decks'
import { blue, red, white } from '../styles/colors'
import {
    clearLocalNotification,
    setLocalNotification } from '../utils/helpers'

const QuestionAnswerHead = ({questionLastPos, questionsLength}) => {
  return (
    <View style={{ flex:1, padding: 10}}>
      <Text>{questionLastPos+1} / {questionsLength} </Text>
    </View>
  )
}

const QuestionAnswer = ({showingQuestion, questionLastPos, questions}) => {
  return (
    <View style={styles.qa}>
      <Text style={{ alignItems : 'center', justifyContent : 'center', fontSize : 30, textAlign : 'center'}}>{
        showingQuestion ? questions[questionLastPos].question : questions[questionLastPos].answer
      }</Text>
    </View>
  )
}
class Quiz extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title : `Quiz from ${navigation.state.params.title}`
    }
  }

  constructor(props){
    super(props)
    this.state = {
      showingQuestion : true,
      questionLastPos : 0,
      questionsLength : 0,
      corrects : 0
    }
    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.restartQuiz = this.restartQuiz.bind(this)
  }

  componentDidMount(){
    this.setState({
      questionsLength : this.props.questions.length
    })
  }
  toggleDisplay(){
    this.setState( (state) => ({
      showingQuestion : !state.showingQuestion
    }))
  }
  handleAnswer(isCorrect){
    this.setState( (state) => ({
      showingQuestion : true,
      corrects : isCorrect ? state.corrects+1 : state.corrects,
      questionLastPos : state.questionLastPos+1
    }))
  }
  restartQuiz(){
    this.setState( (state) => ({
      showingQuestion : true,
      questionLastPos : 0,
      corrects : 0
    }))
  }
  componentDidUpdate(){
    if(this.state.questionLastPos+1 > this.state.questionsLength){
      this.props.updateDeckScore(this.props.deckId, {
        lastTaken : moment().format('DD/MM/YYYY hh:mm'),
        lastScore : Math.ceil(this.state.corrects/this.state.questionsLength * 100)
      })
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }
  render () {
    const { navigation } = this.props;
    const {questionLastPos, showingQuestion, questionsLength, corrects} = this.state

    if(questionLastPos + 1 > questionsLength) {
      return (
        <View style={styles.result}>
          <Text style={{fontSize : 30}}> Score </Text>
          <Text style={{fontSize : 50}}> { Math.ceil(corrects/questionsLength * 100) } </Text>
          <Text style={{fontSize : 20}}> {corrects} correct answers of {questionsLength} questions </Text>
          <TouchableOpacity style={{ padding : 20, marginTop : 20, backgroundColor : blue}} onPress={this.restartQuiz}>
            <Text> Restart Quiz </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding : 20, marginTop : 20, backgroundColor : blue}} onPress={() => navigation.goBack()}>
            <Text> Back to Deck </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <QuestionAnswerHead {...this.state}/>
        <QuestionAnswer
          questions={this.props.questions}
          {...this.state} />
        <TouchableOpacity style={styles.qaButton} onPress={this.toggleDisplay}>
          { showingQuestion
            ? <Text style={{color : blue}}>Show Answer</Text>
            : <Text style={{color : red}}>Show Question</Text>
          }
        </TouchableOpacity>
        <View style={styles.answerButton}>
          <TouchableOpacity
            style={{backgroundColor : red, flex : 1, alignItems : 'center', justifyContent : 'center'}}
            onPress={this.handleAnswer.bind(this, false)}>
            <Text style={{color : white, fontSize : 20}}> Incorrect </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor : blue, flex : 1, alignItems : 'center', justifyContent : 'center'}}
            onPress={this.handleAnswer.bind(this, true)}>
            <Text style={{color : white, fontSize : 20}}> Correct </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps ({decks}, {navigation}) {
  const deckId = navigation.state.params.deckId
  return {
    deckId,
    questions : decks.items[deckId].questions,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateDeckScore
  }, dispatch)
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  qa : {
    flex : 4,
    justifyContent : 'center',
    alignItems : 'center',
    padding : 30
  },
  qaButton : {
    flex : 2,
    padding : 20,
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  answerButton : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'stretch'
  },
  result : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
