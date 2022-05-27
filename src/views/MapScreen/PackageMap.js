import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
// import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8231;
const LONGITUDE = 106.6297;
const DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * ASPECT_RATIO,
};

const MapScreen = ({ route }) => {
  // const { t, i18n } = useTranslation('common');
  const [coords, setCoords] = useState(null);
  const mapRef = useRef(null);
  const { trace, id } = route.params;

  useEffect(() => {
    let packages = [];

    Object.keys(trace.importResult).forEach(storage => {
      trace.importResult[storage].forEach(_package => {
        if (_package.id === id && _package.remain) {
          packages.push({
            coord: _package.address,
            quantity: _package.remain,
          });
        }
      });
    });

    trace.currentShipment.forEach(shipment => {
      if (shipment.packages[id] > 0)
        packages.push({
          coord: shipment.coord,
          quantity: shipment.packages[id],
        });
    });

    setCoords(packages);
  }, []);

  useEffect(() => {
    if (coords && coords.length) {
      mapRef.current.animateCamera(
        {
          center: coords[0].coord,
        },
        { duration: 1000 },
      );
    }
  }, [coords]);

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
        showsUserLocation={true}>
        {/* Map marker */}
        {coords &&
          coords.map((item, index) => (
            <Marker
              coordinate={{
                ...item.coord,
              }}
              key={index.toString()}
              title={`${item.quantity} kiện hàng`}
            />
          ))}
      </MapView>
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
