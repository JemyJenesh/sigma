import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getOrders = async () => {
  const {data} = await axios.get('/api/orders');
  return data;
};

export default function useOrders() {
  return useQuery('orders', getOrders);
}
