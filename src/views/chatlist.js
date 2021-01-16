
import React, {useState} from 'react';
import {
  
  StyleSheet,
  ScrollView,
  View,
  Text,
  
} from 'react-native';

import {

  Colors,

} from 'react-native/Libraries/NewAppScreen';
import Avatar from '../components/avatar';
import { generateChatData } from '../../mock';




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
    const {username, message, initials, color, usericon} = props;
  
    return (
      <View style={styles.chatlistItem}>
        <Avatar username={username} initials={initials} color={color} icon={usericon}/>
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

function ChatList(props) {


  const [chatData, setChatData] = useState(generateChatData(10));
    return (
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        {chatData.map((chatObject) => {
          return <ChatListItem {...chatObject} />;
        })}
      </ScrollView>
    )
}

export default ChatList