import React, {useState, useRef, useEffect, useReducer} from 'react';
import {supermemo} from 'supermemo';
import {View, Text, StyleSheet, Button, TouchableOpacity, Dimensions} from 'react-native';
import {generateSynonymData} from '../../mock';
import Carousel from 'react-native-snap-carousel';
import {minBy, findIndex, sortBy, keysIn, set, keys, clone, mapKeys, mapValues} from 'lodash';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
    borderRadius: 7,
    width: '100%',
  },

  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  mainHeader: {
    fontSize: 25,
    padding: 10,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  word: {
    fontSize: 30,
    color: '#155E93',
    fontWeight: 'bold',
  },
  type: {
    fontSize: 15,
    color: '#155E93',
    fontStyle: 'italic',
  },
  propertyKey: {
    color: '#7E7E7E',
    fontSize: 18,
    marginRight: 10,
  },
  propertyContainer: {
    display: 'flex',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  arialBoldStyle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#444d56',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  btnPositive: {
    backgroundColor: '#5CB85C',
    shadowColor: '#000',
  },
  btnNegative: {
    backgroundColor: '#F0AD4E',
  },
  synsContainer: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    borderRadius: 7,
    paddingHorizontal: 10,
    minHeight: 80,
    marginTop: 5,
  },
});

const ACTIONS = {
  ATTEMPT: 'ATTEMPT',
  ADD_TO_LEARNING: 'ADD_TO_LEARNING',
  ADD_TO_LEARNT: 'ADD_TO_LEARNT',
  ADD_TO_MASTERED: 'ADD_TO_MASTERED',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ATTEMPT':
      console.log(action.payload.flashCardData);
      return {...state, flashCardData: action.payload.flashCardData};
    case 'ADD_TO_LEARNING':
      return {
        ...state,
        learning: action.payload.learning,
      };
    case 'ADD_TO_LEARNT':
      return {...state, learnt: action.payload.learnt};
    case 'ADD_TO_MASTERED':
      return {
        ...state,
        mastered: action.payload.mastered,
      };
    default:
      throw new Error();
  }
};

const colorMap = {
  'New Word': 'lightgrey',
  Learning: 'orange',
  Learnt: 'blue',
  Mastered: 'lightgreen',
};
function FlashCard(props) {
  const ref = useRef(null);

  const {words} = props.route.params;
  const [state, dispatch] = useReducer(reducer, {
    flashCardData: words,
    learning: new Map(),
    learnt: new Map(),
    mastered: new Map(),
  });

  const {flashCardData, mastered, learning, learnt} = state;

  const [count, setCount] = useState(false);
  const {navigation} = props;

  function convertMaptoArray(sampleMap) {
    let arr = [];
    for (let value of sampleMap.values()) {
      arr.push(value);
    }

    return arr;
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.ATTEMPT,
      payload: {
        flashCardData: flashCardData.map((card) => {
          card['attempted'] = false;
          card['interval'] = 0;
          card['efactor'] = 2.5;
          card['repetition'] = 0;
          card['category'] = 'New Word';

          return card;
        }),
      },
    });
  }, []);

  const addToCategories = ({efactor, card}) => {
    // ADDING TO LEARNT
    if (efactor > 2.0 && efactor <= 2.1) {
      if (learning.has(card.word)) {
        learning.delete(card.word);
        dispatch({
          type: ACTIONS.ADD_TO_LEARNING,
          payload: {learning: learning},
        });
      }
      learnt.set(card.word, card);
      dispatch({
        type: ACTIONS.ADD_TO_LEARNT,
        payload: {learnt: learnt},
      });
    }

    // ADDING TO LEARNING
    if (efactor <= 2.0 && efactor > 1.7) {
      learning.set(card.word, card);
      dispatch({
        type: ACTIONS.ADD_TO_LEARNING,
        payload: {learning: learning},
      });

      if (learnt.has(card.word)) {
        learnt.delete(card.word);
        dispatch({
          type: ACTIONS.ADD_TO_LEARNT,
          payload: {learnt: learnt},
        });
      }
    }
  };
  function renderFlashCard(props) {
    const {word, antonym, synonym, sentence_1, meaning_1, attempted, category, efactor, type} = props.item;
    return (
      <View style={styles.container}>
        <View elevation={5} style={[styles.cardContainer, styles.shadowContainer]}>
          <View style={styles.propertyContainer}>
            {/* Word */}
            <Text style={styles.word}>{word}</Text>
            {/* Type */}
            <Text style={styles.type}>
              {type} {efactor}
            </Text>

            <View
              style={{
                backgroundColor: colorMap[category],
                maxWidth: 100,
                borderRadius: 8,
                padding: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  backgroundColor: colorMap[category],

                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {category}
              </Text>
            </View>
            {/* Meaning */}
          </View>
          <View style={styles.propertyContainer}>
            <Text style={styles.propertyKey}>Meaning</Text>
            <View style={styles.synsContainer}>
              <Text style={styles.arialBoldStyle}>{meaning_1}</Text>
            </View>
          </View>

          {/* True false button container */}
          {!attempted ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btnPositive, styles.btn]}
                onPress={() => {
                  let res = supermemo(flashCardData[props.index], 5); // res contains efactor
                  let newObject = Object.assign(
                    {},
                    {
                      ...props.item,
                      ...res,
                      attempted: true,
                    },
                  );

                  // Add to master if efactor is greater than 2.3
                  if (res.efactor >= 2.1) {
                    newObject.category = 'Mastered';
                  }
                  if (res.efactor <= 2.0 && res.efactor > 1.7) {
                    newObject.category = 'Learning';
                  }

                  if (res.efactor > 2.0 && res.efactor <= 2.1) {
                    newObject.category = 'Learnt';
                  }
                  flashCardData[props.index] = newObject;

                  dispatch({
                    type: ACTIONS.ATTEMPT,
                    payload: {flashCardData},
                  });

                  // hack for
                  // categoriseCards({efactor: newObject.efactor, card: newObject});
                  addToCategories({efactor: newObject.efactor, card: newObject});
                  setCount((prv) => prv + 1);
                }}>
                <Text style={{color: 'white', fontSize: 17, textAlign: 'center'}}>I know this word</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  let newObject = Object.assign(
                    {},
                    {
                      ...props.item,
                      ...supermemo(flashCardData[props.index], 1),
                      attempted: true,
                      category: 'Learning',
                    },
                  );
                  flashCardData[props.index] = newObject;

                  // hack for completing the render cycle
                  // categoriseCards({efactor: newObject.efactor, card: newObject});
                  addToCategories({efactor: newObject.efactor, card: newObject});
                  setCount((prv) => prv + 1);
                }}
                style={[styles.btnNegative, styles.btn]}>
                <Text style={{color: 'white', fontSize: 17}}>I don't know this word</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {attempted ? (
            <>
              {/* Sentence */}
              <View style={styles.propertyContainer}>
                <Text style={styles.propertyKey}>Sentence</Text>
                <View style={styles.synsContainer}>
                  <Text style={styles.arialBoldStyle}>{sentence_1}</Text>
                </View>
              </View>

              {/* Anto */}
              <View style={styles.propertyContainer}>
                <Text style={styles.propertyKey}>Synonym</Text>
                <View style={styles.synsContainer}>
                  <Text style={styles.arialBoldStyle}>{synonym}</Text>
                </View>
              </View>
              {/* Syn */}
              <View style={styles.propertyContainer}>
                <Text style={styles.propertyKey}>Antonym</Text>
                <View style={styles.synsContainer}>
                  <Text style={styles.arialBoldStyle}>{antonym}</Text>
                </View>
              </View>
              {/* Button Container */}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // initially show only 4 new words after that initiate learning mechanism
                    if (count < 7) {
                      refPointer.snapToNext();
                    } else {
                      // Get next card

                      if (learning.size > 0) {
                        let newData = convertMaptoArray(learning);

                        dispatch({type: ACTIONS.ATTEMPT, payload: {flashCardData: newData}});
                        refPointer.snapToItem(0);
                      } else if (learnt.size > 0) {
                        let newData = convertMaptoArray(learnt);
                        dispatch({type: ACTIONS.ATTEMPT, payload: {flashCardData: newData}});
                      }

                      //refPointer.snapToItem(index);
                      refPointer.snapToNext();
                    }
                    let newObject = Object.assign(
                      {},
                      {
                        ...props.item,
                        attempted: false,
                      },
                    );

                    flashCardData[props.index] = newObject;

                    addToCategories({efactor: newObject.efactor, card: newObject});
                  }}
                  style={[styles.btnPositive, styles.btn]}>
                  <Text style={{color: 'white', fontSize: 17, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
    );
  }

  const [refPointer, setRefPointer] = useState(null);

  return (
    <>
      {flashCardData.length > 0 ? (
        <Carousel
          ref={(c) => {
            setRefPointer(c);
          }}
          data={flashCardData}
          renderItem={renderFlashCard}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
      ) : (
        <View
          style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'grey'}}>You Finished The Deck!</Text>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: 'lightgrey',
              width: '100%',
              marginTop: 10,
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate('WordDecks')}>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'grey'}}>View Decks</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default FlashCard;
