import React, { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { COLORS } from '../../../styles';
import money from './../../../assets/images/cut_money.png';
import safe_img from './../../../assets/images/safe.png';
import trace from './../../../assets/images/trace.png';
const { height, width } = Dimensions.get('window');

const BenefitSection = props => {
  const ref = useRef(null);
  const data = [
    {
      title: 'Tiết kiệm chi phí',
      subTitle: 'Phí vận chuyển hợp lý',
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
      banner: money,
    },
    {
      title: 'Vận chuyển an toàn',
      subTitle: 'Đảm bảo an toàn cho hàng hóa của bạn',
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
      banner: safe_img,
    },
    {
      title: 'Theo dõi đơn hàng',
      subTitle: 'Theo dõi thông tin đơn hàng mọi lúc',
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
          <Text style={styles.textItem}>{item.title}</Text>
          <Text style={styles.subTextItem}>{item.subTitle}</Text>
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
        itemWidth={(4 * width) / 5}
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
    marginHorizontal: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.gray,
    width: '100%',
  },
  textItem: {
    fontSize: 20,
    color: COLORS.black,
    opacity: 0.75,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  subTextItem: {
    fontSize: 14,
    color: '#3b3b3b',
  },
});
