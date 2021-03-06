import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import safe_img from '../../../assets/images/safe_2.jpg';
import { COLORS, FONTS, STYLES } from '../../../styles';

const Last = props => {
  const { t } = useTranslation("common")
  const { navigate } = useNavigation();
  return (
    <View style={[STYLES.container, { paddingHorizontal: 25 }]}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <TouchableOpacity>
          <Icon name="west" onPress={() => props.onSnap(1)} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.skipBtn}>{t("skip")}</Text>
        </TouchableOpacity> */}
      </View>

      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={styles.title}>{t("onboard.lastTitle")}</Text>
        <Text style={styles.subTitle}>
          {t("onboard.lastBen")}
        </Text>
      </View>

      <View style={{ width: '100%', flex: 1 }}>
        <Image
          source={safe_img}
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
          title={t("start")}
          buttonStyle={{
            borderRadius: 40,
            width: 80,
            height: 80,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => navigate('Signin')}
        />
      </View>
    </View>
  );
};

export default Last;

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
    fontWeight: '600',
    opacity: 1,
    color: '#889399',
    width: '70%',
    lineHeight: 28,
  },
});
