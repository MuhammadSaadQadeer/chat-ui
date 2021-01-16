import React from 'react';
import {Avatar as AvatarElement} from 'react-native-elements';
import {View} from 'react-native';

function ChatAvatar(props) {
  const {username, initials, color,icon} = props
  return (
    <View>
      <AvatarElement
        rounded
        source={{
          uri:icon
        }}
        size={"medium"}
        title={initials && initials}
        avatarStyle={{backgroundColor:color}}
        titleStyle={{color:"white"}}
      />
    </View>
  );
}

export default ChatAvatar;
