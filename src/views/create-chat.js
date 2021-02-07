import React from 'react';
import {Input} from 'react-native-elements';
import {View, Text} from 'react-native';

const ChatBubble = (props) => {
  const {isOwn} = props;
  return (
    <View style={{ display:"flex", flexDirection:isOwn ? "row":"row-reverse"}}>
      <Text style={{backgroundColor: isOwn ? 'red' : 'green',}}>
        Lorem epsomse oasdiufoaufo dsoaifuioasufoiasdof a
        sdfoausfidouaoufiodaufo asodfuaioudfasdfouo afouaosfiasfuoasudfi
      </Text>
    </View>
  );
};

function CreateChat(props) {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'space-between',
          height: '85%',
        }}>
        <View>
          
          <ChatBubble isOwn={true} />
          <ChatBubble isOwn={false} />
        </View>
        <View>
          <Input placeholder="BASIC INPUT" />
        </View>
      </View>
    </>
  );
}

export default CreateChat;
