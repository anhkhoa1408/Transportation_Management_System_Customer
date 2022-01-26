import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { Icon } from 'react-native-elements';

const indicatorStyle = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const getStepIndicatorIconConfig = (props, current) => {
  return (
    props.position === current && {
      name: 'local-shipping',
      color: props.stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 20,
    }
  );
};

const OrderIndicator = props => {
  let { current, name } = props;
  const renderStepIndicator = (params, current) => (
    <Icon {...getStepIndicatorIconConfig(params, current)} />
  );

  const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return current === position ? <Text>{name}</Text> : <Text></Text>;
  };

  return (
    <View style={styles.container}>
      <StepIndicator
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
