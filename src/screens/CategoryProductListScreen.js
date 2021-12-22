import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator, Chip, Divider} from 'react-native-paper';
import {Color} from '../common';
import SubCategoryIcon from '../components/Category/SubCategoryIcon';
import LogoSpinner from '../components/LogoSpinner';
import NoProductFound from '../components/NoProductFound';
import SearchProductCard from '../components/Product/SearchProductCard';
import {axios} from '../utils/axios';

const CategoryProductListScreen = ({route}) => {
  const {category} = route.params;
  const [id, setId] = useState(category.id);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const getProducts = async (id) => {
    const res = await axios.get('/api/products/getAll', {
      params: {
        category: id,
      },
    });
    return res;
  };

  const fetchMore = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get('/api/products/getAll', {
        params: {
          category: id,
          page: page + 1,
        },
      });
      setPage(page + 1);
      setProducts((prev) => ({
        ...prev,
        data: [...prev.data, ...res.data.data],
      }));
    } catch (err) {
      console.log('load more produts error');
      err.response && console.log(err.response.data);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getProducts(id).then((res) => {
      setProducts(res.data);
      setPage(1);
    });
  }, [id]);

  if (products === null) {
    return <LogoSpinner />;
  }
  if (products.data.total < 1) return <NoProductFound />;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        {category.sub_categories.length > 0 && (
          <View style={{paddingTop: 16}}>
            <Text style={[styles.horizontalSpace, styles.titleText]}>
              Sub-categories
            </Text>
            <View
              style={{
                height: 120,
              }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {category.sub_categories.map((cat) => (
                  <SubCategoryIcon
                    key={cat.id}
                    category={cat}
                    selectedId={id}
                    changeCategory={setId}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}
        <Divider />
        <View style={{padding: 16}}>
          {products.data && products.data.length < 1 ? (
            <NoProductFound />
          ) : (
            products.data.map((product) => (
              <SearchProductCard key={product.id} product={product} />
            ))
          )}
        </View>
        {products.last_page !== page && (
          <Chip
            onPress={fetchMore}
            style={{alignSelf: 'center', marginTop: 16, marginBottom: 32}}>
            {loadingMore ? (
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

const styles = StyleSheet.create({
  horizontalSpace: {
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 18,
  },
});

export default CategoryProductListScreen;
