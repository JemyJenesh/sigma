import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {Chip, Divider, IconButton} from 'react-native-paper';
import BrandIcon from '../../components/Brand/BrandIcon';
import ProductCard from '../../components/Product/ProductCard';
import SearchProductCard from '../../components/Product/SearchProductCard';
import {axios} from '../../utils/axios';
import LogoSpinner from '../../components/LogoSpinner';
import Color from '../../common/Color';
import Carousel from 'react-native-snap-carousel';
import FeaturedProduct from '../../components/Product/FeaturedProductCard';

const Home = () => {
  const {width} = Dimensions.get('window');
  const carouselRef = React.useRef();
  const featuredProductRef = React.useRef();
  const [view, setView] = useState('LIST');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [products, setProducts] = useState(null);
  const [brands, setBrands] = useState(null);
  const [featuredImages, setFeaturedImages] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const changeView = (text) => setView(text);

  const fetchProducts = async (p) => {
    try {
      const res = await axios.get('/api/products/getAll', {
        params: {
          page: p,
        },
      });
      setProducts(res.data);
    } catch (err) {
      err.response && alert('Failed to load products.');
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get('/api/agencies/getAll', {
        params: {
          all: true,
        },
      });
      setBrands(res.data);
    } catch (err) {
      err.response && alert('Failed fetching agencies.');
    }
  };

  const fetchMore = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get('/api/products/getAll', {
        params: {
          page: page + 1,
        },
      });
      setPage(page + 1);
      setProducts((prev) => ({
        ...prev,
        data: [...prev.data, ...res.data.data],
      }));
    } catch (err) {
      err.response && alert('Failed fetching products.');
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchFeaturedImages = async () => {
    try {
      const res = await axios.get('/api/featuredImages/getAll');
      setFeaturedImages(res.data);
    } catch (err) {
      err.response && alert('Failed fetching images.');
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/products/getFeaturedProducts');
      setFeaturedProducts(res.data);
    } catch (err) {
      err.response && alert('Failed fetching products.');
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBrands();
    await fetchProducts(1);
    await fetchFeaturedImages();
    await fetchFeaturedProducts();
    setPage(1);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchProducts(1);
    fetchFeaturedImages();
    fetchFeaturedProducts();
  }, []);

  if (
    products == null ||
    brands == null ||
    featuredImages == null ||
    featuredProducts == null
  )
    return <LogoSpinner />;

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {featuredImages && featuredImages.length > 0 && (
          <Carousel
            style={{height: 125, padding: 0}}
            ref={carouselRef}
            loop={true}
            autoplay={true}
            autoplayInterval={5000}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            data={featuredImages}
            renderItem={({item, index}) => {
              return (
                <Image
                  source={{uri: item.image_url}}
                  resizeMode="contain"
                  style={{
                    height: Math.round((width * 35) / 116),
                    width: width,
                  }}
                />
              );
            }}
            sliderWidth={width}
            itemHeight={125}
            itemWidth={width}
          />
        )}
        {brands && brands.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.horizontalSpace,
                  styles.titleText,
                  {
                    paddingTop: 8,
                    textAlign: 'center',
                    backgroundColor: Color.primary,
                    width: '100%',
                    color: 'white',
                  },
                ]}>
                Brands
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: 16,
                backgroundColor: Color.primary,
              }}>
              {brands.map((brand) => (
                <View key={brand.id} style={{width: '25%', marginBottom: 16}}>
                  <BrandIcon brand={brand} />
                </View>
              ))}
            </View>
          </View>
        )}
        <Divider />
        {featuredProducts && featuredProducts.length > 0 && (
          <View style={{paddingTop: 16, backgroundColor: 'rgba(0,0,0,0.025)'}}>
            <Text
              style={[
                styles.horizontalSpace,
                styles.titleText,
                {color: Color.primary},
              ]}>
              Featured Products
            </Text>
            <View style={{paddingVertical: 16}}>
              <Carousel
                ref={featuredProductRef}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                data={featuredProducts}
                renderItem={({item, index}) => (
                  <FeaturedProduct key={item.id} product={item} index={index} />
                )}
                sliderWidth={width}
                itemWidth={width}
              />
            </View>
          </View>
        )}
        <Divider />
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 16,
          }}>
          <View
            style={[
              styles.flexRow,
              {justifyContent: 'space-between', marginBottom: 16},
            ]}>
            <Text style={[styles.titleText, {color: Color.primary}]}>
              Products
            </Text>
            <View style={[styles.flexRow]}>
              <IconButton
                style={styles.viewIcon}
                icon="view-list"
                color={view === 'LIST' ? Color.primary : 'gray'}
                size={28}
                onPress={() => changeView('LIST')}
              />
              <IconButton
                style={styles.viewIcon}
                icon="view-grid"
                color={view === 'GRID' ? Color.primary : 'gray'}
                onPress={() => changeView('GRID')}
              />
            </View>
          </View>

          {products && (
            <View style={styles.productListContainer(view)}>
              {products.data.map((product) =>
                view === 'LIST' ? (
                  <SearchProductCard key={product.id} product={product} />
                ) : (
                  <ProductCard key={product.id} product={product} />
                ),
              )}
            </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalSpace: {
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    margin: 0,
  },
  productListContainer: (type) => ({
    flexDirection: type === 'LIST' ? 'column' : 'row',
    flexWrap: type === 'LIST' ? 'nowrap' : 'wrap',
    justifyContent: 'space-between',
  }),
});

export default Home;
