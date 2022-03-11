import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { FONTS, COLORS, STYLES } from '../../../styles';
import { Icon, Text } from 'react-native-elements';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';

const width = Dimensions.get('window').width;

const Success = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 20,
        }}>
        <Text style={[FONTS.Big, { fontSize: 25 }]}>Thanh toán thành công</Text>
        <Text style={[FONTS.Smol, { color: 'rgba(0,0,0,0.5)' }]}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flex: 4,
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <View style={[styles.circle, { backgroundColor: '#e3ffe9' }]}>
          <View style={[styles.circle, { backgroundColor: '#deffe5' }]}>
            <View style={[styles.circle, { backgroundColor: '#cafad5' }]}>
              <Icon name="check" reverse color={COLORS.success} size={50} />
            </View>
          </View>
        </View>
        <PrimaryButton
          title="Màn hình chính"
          onPress={() => navigation.navigate('HomeScreen')}
          containerStyle={{
            marginTop: 80,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'center',
  },
  circle: {
    padding: 12,
    borderRadius: width / 2,
    borderColor: COLORS.gray,
  },
});
