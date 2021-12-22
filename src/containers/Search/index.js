import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ActivityIndicator, Chip, Searchbar} from 'react-native-paper';
import SearchProductCard from '../../components/Product/SearchProductCard';
import styles from './styles';
import {Color} from '../../common';
import {axios} from '../../utils/axios';

const Search = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const handleChange = (text) => {
    setSearch(text);
  };
  const handleSearch = () => {
    setLoading(true);
    setShowLoadMore(false);
    axios('api/products/getAll', {
      params: {
        search: search,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.data);
          if (res.data.current_page < res.data.last_page) setShowLoadMore(true);
        }
      })
      .finally(() => setLoading(false));
  };
  const loadMore = () => {
    setLoadingMore(true);
    axios('api/products/getAll', {
      params: {
        search: search,
        page: page + 1,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setProducts((prev) => [...prev, ...res.data.data]);
          if (res.data.current_page < res.data.last_page) setShowLoadMore(true);
          else setShowLoadMore(false);
        }
      })
      .finally(() => setLoadingMore(false));
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChange}
          value={search}
          onSubmitEditing={handleSearch}
          selectionColor={Color.primary}
        />
      </View>
      {loading && <ActivityIndicator color={Color.primary} />}
      <ScrollView style={{flex: 1}}>
        {products == null && !loading && (
          <Text style={{textAlign: 'center'}}>
            Your search will appear here.
          </Text>
        )}
        {products != null && products.length < 1 && !loading && (
          <Text style={{textAlign: 'center'}}>No product found.</Text>
        )}
        {products &&
          products.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        {showLoadMore && (
          <Chip
            onPress={loadMore}
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

export default Search;
