import create from 'zustand';

const useOrderDetailsTitle = create((set) => ({
  title: 0,
  setTitle: (text) => set({title: text}),
}));

export default useOrderDetailsTitle;
