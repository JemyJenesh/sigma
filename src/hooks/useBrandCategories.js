import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getCategories = async (key, agencyId) => {
  const {data} = await axios.get('/api/categories/agency/' + agencyId);
  return data;
};

export default function useBrandCategories(agencyId) {
  return useQuery(['brandCategories', agencyId], getCategories);
}
