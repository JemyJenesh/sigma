import {useQuery} from 'react-query';
import {axios} from '../utils/axios';

const getNotifications = async () => {
  const {data} = await axios.get('/api/notifications');
  return data;
};

export default function useNotifications() {
  return useQuery('notifications', getNotifications);
}
