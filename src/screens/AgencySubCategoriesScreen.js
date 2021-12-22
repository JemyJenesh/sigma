import React from 'react';
import {View, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import Styles from '../common/Styles';
import AgencyCategoryCard from '../components/Category/AgencyCategoryCard';

const AgencySubCategoriesScreen = ({route, navigation}) => {
  const {category, agencyId, agencyName} = route.params;
  return (
    <View style={Styles.container}>
      <Appbar.Header theme={{colors: {primary: 'white'}}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={agencyName} subtitle={category.name} />
      </Appbar.Header>

      <ScrollView style={Styles.container}>
        {category.sub_categories.map((subCat) => (
          <AgencyCategoryCard
            key={subCat.id}
            category={subCat}
            agency={agencyId}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AgencySubCategoriesScreen;
