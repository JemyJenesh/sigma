import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getProducts = async () => {
  const {data} = await axios.get('/api/products/getAll');
  return data;
};

export default function useProducts() {
  return useQuery('products', getProducts);
}
