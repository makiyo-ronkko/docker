import { writable } from 'svelte/store';

const useCountStore = () => {
  const { subscribe, set, update } = writable(0);
  // let count = 0;
  // let count = $state(0);

  return {
    // get count() {
    //   return count;
    // },
    // increment: () => count++,
    subscribe,
    increment: () => {
      update((count) => {
        const newCount = count + 1;
        localStorage.setItem('count', newCount);
        return newCount;
      });
    },
  };
};

export { useCountStore };
