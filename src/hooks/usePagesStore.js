import create from 'zustand';
import {axios} from '../utils/axios';

const usePagesStore = create((set) => ({
  pages: null,
  fetchPages: async () => {
    try {
      const response = await axios('/api/pages/1');
      set({
        pages: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default usePagesStore;
