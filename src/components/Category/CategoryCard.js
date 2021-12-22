import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../common';
import {authContext} from '../../context/AuthContext';
import {Card, Subheading} from 'react-native-paper';

const CategoryCard = ({category}) => {
  const {dispatch} = useContext(authContext);
  const navigation = useNavigation();
  const goToCategoryDetails = () => {
    dispatch({type: 'CHANGE_CATEGORY_TITLE', payload: {title: category.name}});
    navigation.navigate('CategoryProductList', {
      category: category,
    });
  };
  return (
    <Card
      style={{
        width: '48%',
        marginBottom: 16,
      }}
      onPress={goToCategoryDetails}>
      <Card.Cover
        source={
          category.image_url
            ? {uri: category.image_url}
            : Images.defaultCategoryImage
        }
        style={{height: 120}}
      />
      <Subheading style={{fontWeight: 'bold', padding: 8}}>
        {category.name}
      </Subheading>
    </Card>
  );
};

export default CategoryCard;
