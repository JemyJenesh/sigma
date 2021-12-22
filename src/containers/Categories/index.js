import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Chip} from 'react-native-paper';
import {Styles} from '../../common';
import Color from '../../common/Color';
import CategoryCard from '../../components/Category/CategoryCard';
import LogoSpinner from '../../components/LogoSpinner';
import {axios} from '../../utils/axios';

const Categories = () => {
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categories, setCategories] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategories = async (p) => {
    try {
      const res = await axios.get('/api/categories/getAll', {
        params: {
          page: p,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.log('category error');
      err.response && console.log(err.response.data);
    }
  };

  const fetchMore = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get('/api/categories/getAll', {
        params: {
          page: page + 1,
        },
      });
      setPage(page + 1);
      setCategories((prev) => ({
        ...prev,
        data: [...prev.data, ...res.data.data],
      }));
    } catch (err) {
      console.log('category error');
      err.response && console.log(err.response.data);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories(1);
    setPage(1);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCategories(1);
  }, []);

  if (categories == null) return <LogoSpinner />;

  return (
    <View style={Styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {categories.total < 1 && (
          <View style={Styles.container}>
            <Text style={{marginVertical: 16, textAlign: 'center'}}>
              No category available.
            </Text>
          </View>
        )}
        {categories.total > 0 && (
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {categories.data.map(
              (cat) =>
                cat.parent_id === null && (
                  <CategoryCard key={cat.id} category={cat} />
                ),
            )}
          </View>
        )}
        {categories.last_page !== page && (
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

export default Categories;
