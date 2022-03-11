import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { FONTS, COLORS, STYLES } from '../../../styles';
import { Icon, Text } from 'react-native-elements';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';

const width = Dimensions.get('window').width;

const Error = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 20,
        }}>
        <Text style={[FONTS.Big, { fontSize: 25 }]}>Thanh toán thất bại</Text>
        <Text style={[FONTS.Smol, { color: 'rgba(0,0,0,0.5)' }]}>
          Có lỗi xảy ra, xin vui lòng thanh toán lại
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flex: 4,
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <View style={[styles.circle, { backgroundColor: '#fff2f3' }]}>
          <View style={[styles.circle, { backgroundColor: '#ffebec' }]}>
            <View style={[styles.circle, { backgroundColor: '#fadee0' }]}>
              <Icon
                name="close"
                color={COLORS.danger}
                reverse
                reverseColor={COLORS.white}
                size={50}
              />
            </View>
          </View>
        </View>
        <PrimaryButton
          backgroundColor={COLORS.danger}
          title="Trở về màn hình chính"
          onPress={() => navigation.navigate('HomeScreen')}
          containerStyle={{
            marginTop: 80,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Error;

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
