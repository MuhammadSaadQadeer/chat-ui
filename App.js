/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Avatar from './src/components/avatar';
import {Divider, SearchBar} from 'react-native-elements';
import {generateChatData} from './mock';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  chatlistItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexWrap: 'wrap',
    width: '100%',
  },
  chatlistText: {
    paddingHorizontal: 5,
    fontSize: 20,
    opacity:0.9
  },
  chatTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    display: 'flex',
    backgroundColor: Colors.lighter,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const ChatListItem = (props) => {
  const {username, message, initials, color} = props;

  return (
    <View style={styles.chatlistItem}>
      <Avatar username={username} initials={initials} color={color}/>
      <View style={{width: '80%'}}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.chatlistText}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const ChatHeader = (props) => {
  return (
    <View style={styles.chatHeader}>
      <View>
        <Text
          style={{fontSize: 28, paddingHorizontal: 15, paddingVertical: 10}}>
          Chat App
        </Text>
      </View>
      <View style={{marginRight: 10}}>
        <Icon name="ellipsis-v" size={30} />
      </View>
    </View>
  );
};

const App: () => React$Node = () => {
  const [chatData, setChatData] = useState(generateChatData(10));
  const [search, setSearch] = useState('');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ChatHeader />
        <SearchBar
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          containerStyle={{
            backgroundColor: Colors.lighter,
            borderStyle: 'dashed',
          }}
          inputContainerStyle={{
            backgroundColor: Colors.lighter,
            borderWidth: 0,
            borderColor: 'transparent',
            borderRadius: 20,
          }}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {chatData.map((chatObject) => {
            return <ChatListItem {...chatObject} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
