import React, {useState, useRef, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {generateSynonymData} from '../../mock';
import Carousel from 'react-native-snap-carousel';

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
};

const reducer = (state, action) => {
  console.log({state}, action);
  switch (action.type) {
    case 'ATTEMPT':
      return {...state, flashCardData: action.payload.flashCardData};
    default:
      throw new Error();
  }
};
function FlashCard(props) {
  const ref = useRef(null);

  const {words} = props.route.params;
  const [state, dispatch] = useReducer(reducer, {
    flashCardData: words,
  });

  const {flashCardData} = state;

  const [count, setCount] = useState(false);

  console.log(words, flashCardData);

  useEffect(() => {
    dispatch({
      type: ACTIONS.ATTEMPT,
      payload: {
        flashCardData: flashCardData.map((card) => {
          card['attempted'] = false;
          return card;
        }),
      },
    });
  }, []);

  function renderFlashCard(props) {
    console.log(props);
    const {
      word,
      antonym,
      synonym,
      sentence_1,
      meaning_1,
      attempted,
    } = props.item;
    return (
      <View style={styles.container}>
        <View
          elevation={5}
          style={[styles.cardContainer, styles.shadowContainer]}>
          <View style={styles.propertyContainer}>
            {/* Word */}
            <Text style={styles.word}>{word}</Text>
            {/* Type */}
            <Text style={styles.type}>{`(Noun)`}</Text>
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
                  let newObject = Object.assign(
                    {},
                    {...props.item, attempted: true},
                  );

                  flashCardData[props.index] = newObject;

                  dispatch({
                    type: ACTIONS.ATTEMPT,
                    payload: {flashCardData},
                  });

                  console.log({flashCardData});
                  // hack for completing the render cycle
                  setCount((prv) => prv + 1);
                }}>
                <Text
                  style={{color: 'white', fontSize: 17, textAlign: 'center'}}>
                  I know this word
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btnNegative, styles.btn]}>
                <Text style={{color: 'white', fontSize: 17}}>
                  I don't know this word
                </Text>
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
                    refPointer.snapToNext();
                  }}
                  style={[styles.btnPositive, styles.btn]}>
                  <Text
                    style={{color: 'white', fontSize: 17, textAlign: 'center'}}>
                    Next
                  </Text>
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
    <Carousel
      ref={(c) => {
        setRefPointer(c);
      }}
      data={flashCardData}
      renderItem={renderFlashCard}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={Dimensions.get('window').width}
    />
  );
}

export default FlashCard;
