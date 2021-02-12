import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: '100%',
  },
  singeStackContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    borderTopColor: '#43B8FE',
    borderTopWidth: 4,
    marginBottom: 30,
  },
});

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

const SingleStack = (props) => {
  const {label} = props;
  return (
    <View style={styles.singeStackContainer}>
      <Text style={{fontSize: 20, padding: 20}}>{label}</Text>
    </View>
  );
};

function CardStacks(props) {
  const [activeSections, setActiveSectionns] = useState([]);

  const renderSectionTitle = (section) => {
    return (
      <View style={styles.singeStackContainer}>
        <Text style={{fontSize: 20, padding: 20}}>{section.title}</Text>
      </View>
    );
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.singeStackContainer}>
        <Text style={{fontSize: 20, padding: 20}}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    //this.setState({activeSections});
    setActiveSectionns({activeSections});
  };

  return (
    <View style={styles.mainContainer}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </View>
  );
}

export default CardStacks;
