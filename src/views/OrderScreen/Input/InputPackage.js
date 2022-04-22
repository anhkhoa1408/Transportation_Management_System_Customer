import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Text, Icon, Divider, ListItem, Button } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import Header from '../../../components/Header';
import { COLORS, FONTS } from '../../../styles';
import OrderStep from '../../../components/StepIndicator/OrderStep';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import ModalMess from '../../../components/ModalMess';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const InputPackage = ({ route, navigation }) => {
  const { t, i18n } = useTranslation("common")
  const { pack } = route?.params;
  const [listPackage, setListPackage] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleDelete = idx => {
    setListPackage([...listPackage.filter((item, index) => index !== idx)]);
  };

  useEffect(() => {
    if (
      pack &&
      !listPackage.some(item => {
        return JSON.stringify(item) === JSON.stringify(pack);
      })
    ) {
      setListPackage([...listPackage, pack]);
    }
  }, [pack]);

  const renderItem = ({ item, index }) => (
    <ListItem style={style.item} key={index}>
      <Icon reverse name="inventory" size={20} color={COLORS.primary} />
      <ListItem.Content>
        <ListItem.Title>{item.name || t("orderScreen.unnamed")}</ListItem.Title>
        <ListItem.Subtitle>{t("orderScreen.quantity")+': ' + item.quantity}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="delete"
        color={COLORS.danger}
        onPress={() => handleDelete(index)}
      />
    </ListItem>
  );
  return (
    <SafeAreaView style={style.container}>
      {alert && (
        <ModalMess
          type="warning"
          message={t("orderScreen.youHaveNotAddedAnyPackagesYet")}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t("orderScreen.transport")}
      />
      {/* <OrderStep current={0} /> */}

      <View style={[style.form, { flex: 1 }]}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 15,
            marginBottom: 15,
          }}>
          {t("orderScreen.clickAddPackageToCreateANewOneOrSelectASamplePackageFromTheList")}
        </Text>

        <FlatList
          contentContainerStyle={{ padding: 5 }}
          data={listPackage}
          renderItem={renderItem}
          keyExtractor={item => v4()}
        />

        <View style={{ marginBottom: 10, paddingTop: 15 }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button
              title={t("orderScreen.addPackages")}
              titleStyle={{ color: COLORS.success }}
              buttonStyle={{
                padding: 14,
                borderRadius: 8,
                backgroundColor: COLORS.neutralSuccess
              }}
              containerStyle={{ flex: 1, marginRight: 5, marginVertical: 15 }}
              onPress={() =>
                navigation.navigate('EditPackage', {
                  ...route.params,
                  order: true,
                })
              }
            />
            <Button
              title={t("orderScreen.packageSample")}
              titleStyle={{ color: COLORS.header }}
              buttonStyle={{
                padding: 14,
                borderRadius: 8,
                backgroundColor: COLORS.neutralHeader
              }}
              containerStyle={{ flex: 1, marginLeft: 5, marginVertical: 15 }}
              onPress={() =>
                navigation.navigate('PackageTemplateList', {
                  ...route.params,
                  useTemplate: true,
                })
              }
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Divider style={{ flex: 1 }} color={COLORS.primary} width={2} />
            <Text style={{ marginHorizontal: 10, color: COLORS.primary }}>
              {t("orderScreen.put")}
            </Text>
            <Divider style={{ flex: 1 }} color={COLORS.primary} width={2} />
          </View>
          <PrimaryButton
            title={t("orderScreen.continue")}
            onPress={() => {
              listPackage.length
                ? navigation.navigate('OrderSummary', {
                    ...route.params,
                    packages: listPackage,
                  })
                : setAlert(true);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  form: {
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    elevation: 15,
    marginBottom: 25,
  },
});

export default InputPackage;
