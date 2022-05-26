import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import money from '../../../assets/images/cut_money.jpg';
import { COLORS, FONTS, STYLES } from '../../../styles';

const First = props => {
  const { t } = useTranslation("common")
  const { navigate } = useNavigation();

  return (
    <View style={[STYLES.container, { paddingHorizontal: 25 }]}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => navigate('Signin')}>
        <Text style={styles.skipBtn}>{t("skip")}</Text>
      </TouchableOpacity>
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={styles.title}>{t("onboard.firstTitle")}</Text>
        <Text style={styles.subTitle}>
          {t("onboard.firstBen")}
        </Text>
      </View>
      <View style={{ width: '100%', flex: 1 }}>
        <Image
          source={money}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
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
          title={t("next")}
          buttonStyle={{
            borderRadius: 40,
            width: 70,
            height: 70,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => props.onSnap(1)}
        />
      </View>
    </View>
  );
};

export default First;

const styles = StyleSheet.create({
  skipBtn: {
    ...FONTS.Big,
    textAlign: 'right',
    color: '#889399',
    fontWeight: '700',
    marginTop: 30,
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
    fontWeight: '600',
    opacity: 1,
    color: '#889399',
    width: '70%',
    lineHeight: 28,
  },
});
