import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import NustLogo from '../images/nustlogo.png';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: '100%',
  },
  singeStackContainer: {
    backgroundColor: 'white',
    borderTopColor: '#43B8FE',
    borderTopWidth: 4,
  },
  sectionTitleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  sectionTitleText: {
    fontSize: 15,
    fontWeight: '500',
  },
  sectionContent: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    //backgroundColor: 'lightgray',
    //padding: 5,
    margin: 5,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  sectionContentBody: {
    fontSize: 15,
    padding: 10,
    color: 'gray',
  },
});

const SECTIONS = [
  {
    sectionHeading: 'UNIVERSITIES',
    content: [
      {logo: require('../images/nustlogo.png'), name: 'NUST'},
      {logo: require('../images/mdcatlogo.jpg'), name: 'MDCAT'},
      {logo: require('../images/ecatlogo.png'), name: 'ECAT'},
    ],
  },
  {
    sectionHeading: 'JOBS',
    content: [
      {logo: require('../images/nustlogo.png'), name: 'Ministry of Finance'},
      {logo: require('../images/mdcatlogo.jpg'), name: 'Ministry of Health'},
      {logo: require('../images/ecatlogo.png'), name: 'Others'},
    ],
  },
  {
    sectionHeading: 'TESTS',
    content: [
      {logo: require('../images/nustlogo.png'), name: 'GRE'},
      {logo: require('../images/mdcatlogo.jpg'), name: 'IELTS'},
      {logo: require('../images/ecatlogo.png'), name: 'Others'},
    ],
  },
];

function CardStacks(props) {
  const [activeSections, setActiveSectionns] = useState([]);

  const sectionHeading = (section) => {
    return (
      <View style={[styles.singeStackContainer, styles.sectionTitleContainer]}>
        <Text styles={styles.sectionTitleText}>{section.sectionHeading}</Text>
      </View>
    );
  };

  const sectionContent = (section) => {
    return (
      <View style={styles.sectionContent}>
        {section.content.map((itr) => {
          return (
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionContentBody}>{itr.name}</Text>
              </View>
              <View>
                <Image
                  style={{width: 140, height: 58, opacity: 0.7}}
                  source={itr.logo}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const updateSections = (activeSections) => {
    //this.setState({activeSections});
    setActiveSectionns(activeSections);
  };

  return (
    <View style={styles.mainContainer}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderSectionTitle={() => {}}
        renderHeader={sectionHeading}
        renderContent={sectionContent}
        onChange={updateSections}
      />
    </View>
  );
}

export default CardStacks;
