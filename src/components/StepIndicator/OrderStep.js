import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../styles';

const indicatorStyle = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: COLORS.primary,
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? COLORS.white : COLORS.primary,
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'person';
      break;
    }
    case 1: {
      iconConfig.name = 'verified-user';
      break;
    }
    case 2: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const OrderStep = props => {
  let { current, name } = props;
  const renderStepIndicator = params => (
    <Icon {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <StepIndicator
        {...props}
        stepCount={3}
        customStyles={indicatorStyle}
        currentPosition={current}
        renderStepIndicator={renderStepIndicator}
        labels={['Nhập thông tin', 'Kiểm tra', 'Thanh toán']}
      />
    </View>
  );
};

export default OrderStep;

const styles = StyleSheet.create({
  container: {},
});
