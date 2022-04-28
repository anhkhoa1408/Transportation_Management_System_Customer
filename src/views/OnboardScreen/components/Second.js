import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, STYLES } from '../../../styles';
import { Button, Icon, Text } from 'react-native-elements';
import money from '../../../assets/images/cut_money.png';
import safe_img from '../../../assets/images/safe.png';
import trace from '../../../assets/images/trace.png';
import { useNavigation } from '@react-navigation/native';

const Second = props => {
  const { navigate } = useNavigation();

  return (
    <View
      style={[STYLES.container, { paddingHorizontal: 25, elevation: 9999 }]}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <TouchableOpacity onPress={() => props.onSnap(0)}>
          <Icon name="west" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Signin')}>
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', flex: 1 }}>
        <Image
          source={trace}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View style={{ alignSelf: 'flex-start', marginBottom: 30 }}>
        <Text style={styles.title}>Theo dõi nhanh chóng</Text>
        <Text style={styles.subTitle}>
          Theo dõi đơn hàng của bạn ngay lập tức trên{'\n'}ứng dụng
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 50,
          alignSelf: 'flex-end',
        }}>
        <Button
          title="Tiếp"
          buttonStyle={{
            borderRadius: 40,
            width: 70,
            height: 70,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => props.onSnap(2)}
        />
      </View>
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({
  skipBtn: {
    ...FONTS.Big,
    textAlign: 'right',
    color: '#889399',
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#4a4a4a',
    lineHeight: 35,
    marginBottom: 15,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    opacity: 1,
    color: '#889399',
    width: '70%',
    lineHeight: 28,
  },
});
