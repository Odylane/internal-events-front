import jwtInterceptor from "@/shared/jwtInterceptor";

const state = {
  events: [],
};

const mutations = {
  SET_EVENTS(state, events) {
    state.events = events;
  },
};

const actions = {
  getEvents({ commit }) {
    jwtInterceptor
      .get("events")
      .then(({ data }) => commit("SET_EVENTS", data));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
