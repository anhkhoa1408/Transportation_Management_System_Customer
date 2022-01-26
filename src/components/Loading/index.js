import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-spinkit';
import { SafeAreaView, StyleSheet } from 'react-native';
import { primaryColor } from '../../styles/color';
import { containerOverlay } from '../../styles/layoutStyle';
import { Text } from 'react-native-elements';
import { COLORS } from '../../styles';

const Loading = () => {
  //   const [visible, setVisible] = useState(true);
  //   useEffect(() => {
  //     let time = setTimeout(() => setVisible(false), 10000);
  //     return () => {
  //       clearTimeout(time);
  //     };
  //   }, [visible]);

  return (
    <SafeAreaView style={[styles.container, styles.containerOverlay]}>
      <Spinner
        style={styles.spinner}
        isVisible={true}
        size={100}
        type="ThreeBounce"
        color={COLORS.primary}
      />
      <Text style={styles.text}>Xin vui lòng đợi</Text>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    zIndex: 9999,
  },
  containerOverlay: {
    ...containerOverlay,
  },
  spinner: {
    marginBottom: 10,
  },
  text: {
    color: COLORS.primary,
    fontSize: 20,
  },
});

export default Loading;
