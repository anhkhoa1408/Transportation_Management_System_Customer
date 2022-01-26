import React from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

function HeaderAvatar({ url, onPressAction }) {
  return (
    <TouchableOpacity onPress={() => onPressAction()}>
      <Avatar
        rounded
        size="small"
        source={{
          uri: url,
        }}
      />
    </TouchableOpacity>
  );
}

export default HeaderAvatar;
