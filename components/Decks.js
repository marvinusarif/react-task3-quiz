import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'
import { white, purple } from '../styles/colors'


function DeckBlock (item) {
  const { deckId, title, questions, navigation } = item
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{flex : 1, alignItems : 'center' }} onPress={() => navigation.navigate(
          'Deck',
          {
            deckId,
            title
          })}>
          <Text style={{fontSize : 40}}>{title}</Text>
          <Text style={{fontSize : 30}}>{questions.length} Cards</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding: 20,
    backgroundColor: white,
    borderColor : purple,
    borderWidth : 1,
    marginTop : 10
  }
})

class Decks extends Component {
  constructor(props){
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }
  renderItem(props) {
    const { item } = props
    return <DeckBlock {...item} navigation={this.props.navigation}/>
  }
  componentDidMount(){
    this.props.fetchDecks()
  }
  render(){
    const { decks } = this.props
    return (
      <View>
        <FlatList
          data={_.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.deckId}
          />
      </View>
    )
  }
}

function mapStateToProps ({decks}, ownProps) {
  return {
    decks : decks.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchDecks : () => dispatch(fetchDecks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Decks)
