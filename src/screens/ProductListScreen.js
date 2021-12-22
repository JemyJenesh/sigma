import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {ActivityIndicator, Appbar, Chip, List} from 'react-native-paper';
import {Color} from '../common';
import LogoSpinner from '../components/LogoSpinner';
import NoProductFound from '../components/NoProductFound';
import SearchProductCard from '../components/Product/SearchProductCard';
import {authContext} from '../context/AuthContext';
import useBrandProducts from '../hooks/useBrandProducts';

const ProductListScreen = ({route, navigation}) => {
  const {agencyId, categoryId, categoryName} = route.params;
  const {state} = useContext(authContext);
  const {
    data,
    isLoading,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useBrandProducts(agencyId, categoryId);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar.Header theme={{colors: {primary: 'white'}}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={state.agencyTitle} subtitle={categoryName} />
      </Appbar.Header>
      {isLoading && <LogoSpinner />}
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {isLoading ? null : data[0].total < 1 ? (
          <NoProductFound />
        ) : (
          <View style={{padding: 16}}>
            {data.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((product) => (
                  <SearchProductCard key={product.id} product={product} />
                ))}
              </React.Fragment>
            ))}
          </View>
        )}
        {canFetchMore && (
          <Chip
            onPress={() => fetchMore()}
            style={{alignSelf: 'center', marginTop: 16, marginBottom: 32}}>
            {isFetchingMore ? (
              <ActivityIndicator color={Color.primary} />
            ) : (
              'Load More'
            )}
          </Chip>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductListScreen;
