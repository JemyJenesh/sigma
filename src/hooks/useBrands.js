import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getBrands = async () => {
  const {data} = await axios.get('/api/agencies/getAll');
  return data;
};

export default function useBrands() {
  return useQuery('brands', getBrands);
}
