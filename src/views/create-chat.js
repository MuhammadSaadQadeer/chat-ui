import React from 'react';
import {Input} from 'react-native-elements';
import {View, Text} from 'react-native';



function CreateChat(props) {
  return (
    <>
      <View style={{display: 'flex', flexDirection: 'column', paddingLeft:10, paddingRight:10, justifyContent:"space-between", height:"85%"}}>
        <View>
          <Text>Chat Renderer</Text>
        </View>
        <View>
          <Input placeholder="BASIC INPUT" />
        </View>
      </View>
    </>
  );
}

export default CreateChat;
