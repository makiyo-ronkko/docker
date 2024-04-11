import { writable } from 'svelte/store';

let initialLocation = (() => {
  if (
    typeof window !== 'undefined' &&
    localStorage.hasOwnProperty('location')
  ) {
    return JSON.parse(localStorage.getItem('location'));
  }
  return { x: 0, y: 0 };
})();

const locationStore = writable(initialLocation);

const useLocationStore = () => {
  return {
    subscribe: locationStore.subscribe,
    up: () => {
      locationStore.update((location) => {
        const newLocation = { ...location, y: location.y + 1 };
        localStorage.setItem('location', JSON.stringify(newLocation));
        return newLocation;
      });
    },
    down: () => {
      locationStore.update((location) => {
        const newLocation = { ...location, y: location.y - 1 };
        localStorage.setItem('location', JSON.stringify(newLocation));
        return newLocation;
      });
    },
    left: () => {
      locationStore.update((location) => {
        const newLocation = { ...location, x: location.x - 1 };
        localStorage.setItem('location', JSON.stringify(newLocation));
        return newLocation;
      });
    },
    right: () => {
      locationStore.update((location) => {
        const newLocation = { ...location, x: location.x + 1 };
        localStorage.setItem('location', JSON.stringify(newLocation));
        return newLocation;
      });
    },
  };
};

export { useLocationStore };
