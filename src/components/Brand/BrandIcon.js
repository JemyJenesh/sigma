import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../common/Color';
import {authContext} from '../../context/AuthContext';

const BrandIcon = ({brand}) => {
  const {dispatch} = useContext(authContext);
  const navigation = useNavigation();

  const gotoAgencyCategoriesScreen = () => {
    dispatch({
      type: 'CHANGE_AGENCY_TITLE',
      payload: {
        title: brand.name,
      },
    });
    navigation.navigate('AgencyCategoriesList', {
      agencyId: brand.id,
      agencyName: brand.name,
    });
  };

  const getBrandAcronym = () => {
    let temp = brand.name.split(' ');
    if (temp.length === 1) {
      return temp[0][0];
    }
    return temp[0][0] + temp[1][0];
  };
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() => gotoAgencyCategoriesScreen()}>
      <>
        {!!brand.logo_url ? (
          <Avatar.Image
            size={64}
            source={{uri: brand.logo_url}}
            style={{
              backgroundColor: Color.DirtyBackground,
            }}
          />
        ) : (
          <Avatar.Text
            size={64}
            label={getBrandAcronym().toUpperCase()}
            color={Color.primary}
            labelStyle={{fontSize: 24}}
            style={{backgroundColor: 'white'}}
          />
        )}
        <Text
          numberOfLines={1}
          style={{
            fontSize: 10,
            marginTop: 4,
            paddingHorizontal: 4,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {brand.description}
        </Text>
      </>
    </TouchableOpacity>
  );
};

export default BrandIcon;
