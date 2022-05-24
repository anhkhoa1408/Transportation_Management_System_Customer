import React, { useRef, useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
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
  const { t, i18n } = useTranslation('common');
  const [coord, setCoord] = useState(null);
  const mapRef = useRef(null);
  const { type, previousScreen } = route.params;

  useEffect(() => {
    let address;
    if (previousScreen === 'EditOrderInfo') address = route.params.item[type];
    else address = route.params[type];
    const merge_address = `${address.street}, ${address.ward}, ${address.province}, ${address.city}`;
    Geocoder.from(merge_address)
      .then(json => {
        console.log(JSON.stringify(json.results));
        if (json.results[0]) {
          setCoord({
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
          });
        }
      })
      .catch(error => console.warn(error));
  }, [route.params]);

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

  const onChooseAddress = () => {
    if (previousScreen) {
      if (previousScreen === 'EditOrderInfo')
        route.params.item[type] = { ...route.params.item[type], ...coord };
      else route.params[type] = { ...route.params[type], ...coord };
      navigation.navigate({
        name: previousScreen,
        params: route.params,
        merge: true,
      });
    }
  };

  const handleMapPress = event => {
    const tempCoord = event.nativeEvent.coordinate;
    setCoord(tempCoord);
  };

  return (
    <View style={styles.container}>
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
            draggable
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            title={''}
            identifier={'coord'}
            onDragEnd={e => setCoord(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>
      <PrimaryButton
        containerStyle={styles.button}
        title={t('orderScreen.confirm')}
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
