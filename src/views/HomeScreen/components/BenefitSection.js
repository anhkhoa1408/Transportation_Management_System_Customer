import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { COLORS } from '../../../styles';
import money from './../../../assets/images/cut_money.png';
import safe_img from './../../../assets/images/safe_2.jpg';
import trace from './../../../assets/images/trace.png';
const { height, width } = Dimensions.get('window');

const BenefitSection = props => {
  const ref = useRef(null);
  const { t } = useTranslation("common")
  const data = [
    {
      title: "homeScreen.costSaving",
      subTitle: "homeScreen.reasonable",
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
      banner: money,
    },
    {
      title: "homeScreen.safe",
      subTitle: "homeScreen.safety",
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
      banner: safe_img,
    },
    {
      title: "homeScreen.trust",
      subTitle: "homeScreen.trace",
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
      banner: trace,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const onPressCarousel = index => {
    ref.current.snapToItem(index);
  };

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => onPressCarousel(index)}>
      <View style={[styles.itemContainer]}>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={styles.textItem}>{t(item.title)}</Text>
          <Text style={styles.subTextItem}>{t(item.subTitle)}</Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Image
            source={item.banner}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center' }]}>
      <Carousel
        inactiveSlideOpacity={1}
        ref={ref}
        layout={'default'}
        data={data}
        sliderWidth={width}
        itemWidth={(5 * width) / 6}
        renderItem={renderItem}
        firstItem={0}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};

export default BenefitSection;

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    marginVertical: 25,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 0.9,
    borderColor: COLORS.gray,
    width: '100%',
  },
  textItem: {
    fontSize: 20,
    color: COLORS.black,
    opacity: 0.75,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subTextItem: {
    fontSize: 14,
    color: '#3b3b3b',
  },
});
