import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { primary } from '../../styles/color';
import { shadowCard } from '../../styles/layoutStyle';
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const InfoCard = ({ item, navigation }) => {
  const ref = useRef(null);
  const handlePress = async navigate => {
    await ref.current.animate({
      0: {
        scale: 1,
      },
      0.25: {
        scale: 1,
        opacity: 0.9,
      },
      0.75: {
        scale: 0.8,
        opacity: 1,
      },
      1: {
        scale: 1,
      },
    });
    navigation.navigate(navigate);
  };
  return (
    <Animatable.View ref={ref} duration={500} easing="ease">
      <TouchableWithoutFeedback onPress={() => handlePress(item.navigate)}>
        <ListItem containerStyle={styles.listItem}>
          <ListItem.Content
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: primary,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: 10,
                borderRadius: 15,
                marginBottom: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Icon name={item.icon} color={primary} />
              </View>
            </View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                textAlign: 'center',
              }}>
              {item.title}
            </Text>
          </ListItem.Content>
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 180,
    height: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: primary,
    borderColor: '#000',
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 20,
    ...shadowCard,
  },
  titleFont: {
    fontSize: 16,
    color: '#737373',
  },
});

export default InfoCard;
