import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {Color} from '../common';
import AgencyCategoryCard from '../components/Category/AgencyCategoryCard';
import {axios} from '../utils/axios';
import useBrandCategories from '../hooks/useBrandCategories';

const AgencyCategoriesScreen = ({navigation, route}) => {
  const {agencyName, agencyId} = route.params;
  const {data, isLoading} = useBrandCategories(agencyId);

  return (
    <View style={styles.container}>
      <Appbar.Header theme={{colors: {primary: 'white'}}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={agencyName} />
      </Appbar.Header>
      {isLoading ? (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator color={Color.primary} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {data && data.length > 0 ? (
            data.map((cat) => (
              <AgencyCategoryCard
                key={cat.id}
                category={cat}
                agency={agencyId}
                agencyName={agencyName}
              />
            ))
          ) : (
            <Text style={styles.text}>No Category in {agencyName}.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 16,
  },
});

export default AgencyCategoriesScreen;
