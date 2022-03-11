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
  currentStepLabelColor: '#fe7013',
};

const getStepIndicatorIconConfig = (props, current) => {
  const iconConfig = {
    name: 'feed',
    color: props.stepStatus === 'finished' ? '#ffffff' : COLORS.primary,
    size: 16,
  };
  switch (props.position) {
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'inventory';
      break;
    }
    case 2: {
      iconConfig.name = 'local-shipping';
      break;
    }
    case 3: {
      iconConfig.name = 'storefront';
      break;
    }
    case 4: {
      iconConfig.name = 'home';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const OrderIndicator = props => {
  let { current, name } = props;
  const renderStepIndicator = (params, current) => (
    <Icon {...getStepIndicatorIconConfig(params, current)} />
  );

  const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return position === current && position === 2 ? (
      <Text>{name}</Text>
    ) : (
      <Text></Text>
    );
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        {...props}
        customStyles={indicatorStyle}
        currentPosition={current}
        renderLabel={renderLabel}
        renderStepIndicator={e => renderStepIndicator(e, current)}
        labels={Array.from({ length: 5 }, (_, i) => name)}
      />
    </View>
  );
};

export default OrderIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
