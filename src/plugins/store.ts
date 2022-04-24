import { createStore } from "vuex";
import createPersistedstate from "./persistedstate";

export default createStore({
  plugins: [createPersistedstate()],
  state: {
    user: {
      email: null,
      api_token: null,
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    updateUser(context) {
      context.commit("userUpdated");
    },
  },
  modules: {},
});
