import React, { useRef, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
import GooglePlacesInput from './GooglePlaceInput';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import Geocoder from 'react-native-geocoding';
import { useTranslation } from 'react-i18next';

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'vi' });

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8231;
const LONGITUDE = 106.6297;
const DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * ASPECT_RATIO,
};

const MapScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
  const [coord, setCoord] = useState(null);
  const [name, setName] = useState('');
  const [isGeoCodeNeeded, setIsGeoCodeNeeded] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => setCoord(info.coords),
      err => console.log(err),
      { timeout: 5000, maximumAge: 5000, enableHighAccuracy: true },
    );
  }, []);

  useEffect(() => {
    if (coord) {
      mapRef.current.animateCamera(
        {
          center: coord,
        },
        { duration: 1000 },
      );
    }
  }, [coord]);

  const prepareAddress = address => {
    const parsedAddress = address.split(',').map(item => item.trim());
    parsedAddress.pop(); // Remove country
    return {
      city: parsedAddress.pop(),
      province: parsedAddress.pop(),
      ward: parsedAddress.pop(),
      street: parsedAddress.reduce((pre, curr) => `${pre}, ${curr}`),
    };
  };

  const navigateBack = data => {
    if (route.params?.previousScreen) {
      navigation.navigate({
        name: route.params?.previousScreen,
        params: {
          [route.params?.type]: {
            ...data,
          },
        },
        merge: true,
      });
    }
  };

  const onChooseAddress = () => {
    if (isGeoCodeNeeded) {
      Geocoder.from(coord)
        .then(json => {
          const address = prepareAddress(json.results[0].formatted_address);
          navigateBack({ ...coord, ...address });
        })
        .catch(error => console.warn(error));
    } else return navigateBack({ ...coord, ...prepareAddress(name) });
  };

  const handleAutoInputResult = (data, details) => {
    if (data?.description && details?.geometry?.location) {
      setName(data.description);
      setCoord({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      setIsGeoCodeNeeded(false);
    }
  };

  const handleMapPress = event => {
    const tempCoord = event.nativeEvent.coordinate;
    setCoord(tempCoord);
    setIsGeoCodeNeeded(true);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesInput handleResult={handleAutoInputResult} />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          ...DELTA,
        }}
        onPress={handleMapPress}
        showsUserLocation={true}>
        {/* Map marker */}
        {coord && (
          <Marker
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            title={''}
            identifier={'coord'}
          />
        )}
      </MapView>
      <PrimaryButton
        containerStyle={styles.button}
        title={t("mapScreen.choosePlace")}
        onPress={onChooseAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default MapScreen;
