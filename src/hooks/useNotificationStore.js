import create from 'zustand';
import {axios} from '../utils/axios';

const useNotificationStore = create((set) => ({
  unreadnotificationsCount: 0,
  setUnreadnotificationsCount: (count) =>
    set({unreadnotificationsCount: count}),
  incrementCount: () =>
    set((state) => ({
      unreadnotificationsCount: state.unreadnotificationsCount + 1,
    })),
  notifications: null,
  fetchNotifications: async () => {
    try {
      const response = await axios('/api/notifications');
      set({
        notifications: response.data.notifications,
        unreadnotificationsCount: response.data.unreadnotifications_count,
      });
    } catch (err) {
      console.log(err);
    }
  },
  markAllAsRead: () => set({unreadnotificationsCount: 0}),
}));

export default useNotificationStore;
