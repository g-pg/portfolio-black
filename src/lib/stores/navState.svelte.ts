export function createNavState() {
  let state = $state(false);
  let navOrigin = $state(false);

  return {
    get state() {
      return state;
    },

    get navOrigin() {
      return navOrigin;
    },

    set(newState: boolean) {
      state = newState;
    },

    setNavOrigin() {
      navOrigin = true;

      setTimeout(() => {
        navOrigin = false;
      }, 500);
    },
  };
}

export const navState = createNavState();
