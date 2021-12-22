import React from 'react';
import ProductDetail from '../containers/ProductDetails';

const ProductDetailScreen = ({route}) => {
  const {product} = route.params;
  return <ProductDetail product={product} />;
};

export default ProductDetailScreen;
