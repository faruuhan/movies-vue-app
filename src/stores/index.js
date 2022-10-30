import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      favorite: [],
    };
  },
  mutations: {
    setFavorite(state, payload) {
      state.favorite = payload;
    },
  },
});
