import {useInfiniteQuery} from 'react-query';
import {axios} from '../utils/axios';

const getProducts = async (key, id, catId, page = 1) => {
  const {data} = await axios.get('/api/products/getAll?page=' + page, {
    params: {
      brand: id,
      category: catId,
    },
  });
  return data;
};

export default function useBrandProducts(id, catId) {
  return useInfiniteQuery(['brandProducts', id, catId], getProducts, {
    getFetchMore: (lastGroup, allGroups) =>
      lastGroup.current_page < lastGroup.last_page &&
      lastGroup.current_page + 1,
  });
}
