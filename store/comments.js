import Comments from "~/models/Comment";

export const state = () => ({
  items: [],
  parent_id: null
});

export const mutations = {
  SET_COLLECTION(state, data) {
    state.items = data;
  },
  SET_PARENT_ID(state, data) {
    state.parent_id = data;
  }
};

export const actions = {
  async fetch({ commit, state }) {
    try {
      const data = await Comments.get();
      commit('SET_COLLECTION', data);
    } catch (error) {

    }
  }
};
