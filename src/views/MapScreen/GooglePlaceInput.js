import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

const GooglePlacesInput = ({ handleResult }) => {
  const { t, i18n } = useTranslation("common")
  return (
    <GooglePlacesAutocomplete
      placeholder={t("mapScreen.searchForAPlace")}
      onPress={(data, details = null) => {
        handleResult(data, details);
      }}
      onFail={err => console.log(err)}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'vi',
        components: 'country:vn',
      }}
      fetchDetails={true}
      GooglePlacesDetailsQuery={{ fields: 'geometry' }}
      debounce={1000}
      minLength={2}
      styles={{
        container: {
          marginHorizontal: 60,
          marginTop: 10,
          position: 'absolute',
          zIndex: 1,
          width: Dimensions.get('window').width - 120,
        },
        textInput: {
          paddingHorizontal: 20,
        },
      }}
    />
  );
};

export default GooglePlacesInput;
