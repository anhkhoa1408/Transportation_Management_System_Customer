import React, { useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS, STYLES } from '../../styles';
import First from './components/First';
import Last from './components/Last';
import Second from './components/Second';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const OnboardScreen = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [data, setData] = useState([
    {
      screen: <First onSnap={index => onPressCarousel(index)} />,
    },
    {
      screen: <Second onSnap={index => onPressCarousel(index)} />,
    },
    {
      screen: <Last onSnap={index => onPressCarousel(index)} />,
    },
  ]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onPressCarousel(index)}
        style={{ flex: 1 }}>
        {item.screen}
      </TouchableWithoutFeedback>
    );
  };

  const onPressCarousel = index => {
    ref.current.snapToItem(index);
  };

  return (
    <SafeAreaView style={[STYLES.container]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Carousel
          ref={ref}
          layout={'default'}
          data={data}
          sliderWidth={width}
          itemWidth={width}
          itemHeight={height}
          renderItem={renderItem}
          firstItem={active}
          activeSlideOffset={30}
          onSnapToItem={index => {
            setActive(index);
          }}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={active}
          containerStyle={styles.pagContainer}
          dotStyle={styles.paginateDot}
          inactiveDotOpacity={0.5}
          inactiveDotScale={0.4}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  pagContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
  },
  paginateDot: {
    backgroundColor: COLORS.primary,
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: -10,
  },
});
