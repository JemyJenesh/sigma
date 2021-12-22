import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getCategories = async (all = false) => {
  if (all) {
    const {data} = await axios.get('/api/categories/getAll', {
      params: {
        all: 1,
      },
    });
    return data;
  }
  const {data} = await axios.get('/api/categories/getAll');
  return data;
};

export default function useCategories() {
  return useQuery('categories', getCategories);
}
