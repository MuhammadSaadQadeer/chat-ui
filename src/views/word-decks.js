import React from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {decks} from '../mock-data';

function WordDecks(props) {
  const {navigation} = props;
  const WordDeck = ({title, numberOfWords, diffultyLevel, words}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
          padding: 10,
          borderRadius: 7,
        }}>
        <Text style={{paddingTop: 7, fontSize: 24, color: 'grey'}}>
          {title}
        </Text>
        <Text style={{paddingTop: 7, fontSize: 12, color: 'grey'}}>
          No of words {words.length}
        </Text>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'lightgrey',
            marginTop: 5,
            borderRadius: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FlashCards', {
                words,
              })
            }>
            <Text style={{fontSize: 20, color: 'grey'}}>Learn these words</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{paddingHorizontal: 20, paddingVertical: 20, marginBottom: 40}}>
      {Object.keys(decks).map((deckName) => {
        return <WordDeck {...decks[deckName]} />;
      })}
    </ScrollView>
  );
}

export default WordDecks;
