import React from 'react';
import {Avatar as AvatarElement} from 'react-native-elements';
import {View} from 'react-native';

function ChatAvatar(props) {
  const {username, initials, color} = props
  return (
    <View>
      <AvatarElement
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        size={"medium"}
        title={initials && initials}
        avatarStyle={{backgroundColor:color}}
      />
    </View>
  );
}

export default ChatAvatar;
