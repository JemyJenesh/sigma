import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getCart = async () => {
  const {data} = await axios.get('/api/cart');
  return data;
};

export default function useCart() {
  return useQuery('cart', getCart);
}
