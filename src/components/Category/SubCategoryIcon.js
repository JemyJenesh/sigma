import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import Color from '../../common/Color';

const SubCategoryIcon = ({category, selectedId, changeCategory}) => {
  const getSubCategoryAcronym = () => {
    let temp = category.name.split(' ');
    if (temp.length === 1) {
      return temp[0][0];
    }
    return temp[0][0] + temp[1][0];
  };
  const toggleSelection = () => {
    if (category.id === selectedId) {
      changeCategory(category.parent_id);
    } else {
      changeCategory(category.id);
    }
  };
  return (
    <TouchableOpacity
      style={{alignItems: 'center', width: 100}}
      onPress={toggleSelection}>
      <>
        {!!category.logo_url ? (
          <Avatar.Image
            size={64}
            source={{uri: category.image_url}}
            style={[
              {
                backgroundColor: Color.DirtyBackground,
              },
              styles.active(selectedId === category.id),
            ]}
          />
        ) : (
          <Avatar.Text
            size={64}
            label={getSubCategoryAcronym().toUpperCase()}
            color="white"
            labelStyle={{fontSize: 24}}
            style={[
              {backgroundColor: Color.primary},
              styles.active(selectedId === category.id),
            ]}
          />
        )}
        <Text numberOfLines={1} style={{fontSize: 10, marginTop: 4}}>
          {category.name}
        </Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: (active) => ({
    borderWidth: active ? 4 : 0,
    borderColor: 'rgba(0,0,0,0.2)',
  }),
});

export default SubCategoryIcon;
