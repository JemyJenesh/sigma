import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getProducts = async (key, id) => {
  const {data} = await axios.get('/api/products/getAll', {
    params: {
      category: id,
    },
  });
  return data;
};

export default function useBrandProducts(id) {
  return useQuery(['categoryProducts', id], getProducts);
}
