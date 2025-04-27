import { create } from 'zustand';

const useHeaderStore = create((set) => ({
  height: 0,
  setHeight: (height) => set({ height }),
}));

export default useHeaderStore;
