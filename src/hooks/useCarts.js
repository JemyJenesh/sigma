import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getCarts = async () => {
  const {data} = await axios.get('/api/cart');
  return data;
};

export default function useOrders() {
  return useQuery('carts', getCarts);
}
