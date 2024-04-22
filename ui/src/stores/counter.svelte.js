import { writable } from 'svelte/store';
import * as countApi from '../http-actions/count-api.js';

const useCountStore = () => {
  const { subscribe, set, update } = writable(0);
  // let count = 0;
  // let count = $state(0);

  const initCount = async () => {
    const initialCount = await countApi.getCount();
    set(initialCount);
  };

  initCount();

  return {
    // get count() {
    //   return count;
    // },
    // increment: () => count++,
    subscribe,
    // increment: () => {
    //   update((count) => {
    //     const newCount = count + 1;
    //     localStorage.setItem('count', newCount);
    //     return newCount;
    //   });
    // },
    increment: async () => {
      update(async (count) => {
        const newCount = count + 1;
        await countApi.incrementCount();
        return newCount;
      });
    },
  };
};

export { useCountStore };
