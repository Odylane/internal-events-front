import jwtInterceptor from "@/shared/jwtInterceptor";

const state = {
  eventTypes: [],
  topics: [],
  rooms: [],
};

const mutations = {
  SET_EVENT_TYPES(state, eventTypes) {
    state.eventTypes = eventTypes;
  },
  SET_TOPICS(state, topics) {
    state.topics = topics;
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms;
  },
};

const actions = {
  getAllEventTypes({ commit }) {
    jwtInterceptor
      .get("eventTypes")
      .then(({ data }) => commit("SET_EVENT_TYPES", data))
  },
  getAllTopics({ commit }) {
    jwtInterceptor
      .get("topics")
      .then(({ data }) => commit("SET_TOPICS", data))
  },
  getAllRooms({ commit }) {
    jwtInterceptor
      .get("rooms")
      .then(({ data }) => commit("SET_ROOMS", data))
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
