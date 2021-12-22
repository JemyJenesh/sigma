import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Images} from '../../common';

const AgencyCategoryCard = ({category, agency, agencyName}) => {
  const navigation = useNavigation();
  const gotoNextScreen = () => {
    if (category.sub_categories.length > 0)
      navigation.navigate('AgencySubCategoriesList', {
        agencyId: agency,
        category: category,
        agencyName: agencyName,
      });
    else
      navigation.navigate('ProductList', {
        agencyId: agency,
        categoryId: category.id,
        categoryName: category.name,
      });
  };
  return (
    <>
      <List.Item
        onPress={gotoNextScreen}
        left={() => (
          <Image
            style={{height: 50, width: 50, marginRight: 8}}
            source={
              category.image_url
                ? {uri: category.image_url}
                : Images.defaultCategoryImage
            }
            resizeMode="center"
          />
        )}
        title={category.name}
        titleStyle={{fontWeight: 'bold'}}
      />
      <Divider />
    </>
  );
};

export default AgencyCategoryCard;
