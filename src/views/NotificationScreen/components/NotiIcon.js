import React from 'react';
import { Avatar, Icon } from 'react-native-elements';
import { primary } from '../../../styles/color';
import { getAvatarFromUri } from '../../../utils/avatarUltis';

const NotiIcon = ({ type, icon }) => {
  const avatar = uri => {
    return (
      <Avatar
        containerStyle={{ margin: 8 }}
        source={{ uri: getAvatarFromUri(uri) }}
        rounded
        size="medium"
      />
    );
  };

  const notAvatar = iconName => {
    return (
      <Icon
        containerStyle={{ marginRight: 6 }}
        reverse
        reverseColor="#FFF"
        color={primary}
        size={24}
        name={iconName}
        type="feather"
      />
    );
  };

  return type === 'chat' ? avatar(icon) : notAvatar(icon);
};

export default NotiIcon;
