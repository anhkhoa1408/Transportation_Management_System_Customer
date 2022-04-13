import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { COLORS } from '../../styles';

const CustomSearch = props => {
  const { t } = useTranslation('common');
  return (
    <SearchBar
      cancelButtonTitle={t('cancel')}
      placeholder={t('search')}
      value=""
      platform="ios"
      inputContainerStyle={{ backgroundColor: COLORS.gray }}
      {...props}
    />
  );
};

export default CustomSearch;
