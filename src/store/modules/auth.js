import axios from "axios";
import jwtInterceptor from "@/shared/jwtInterceptor";
import { jwtDecrypt } from "@/shared/helper";

const state = {
  authData: {
    token: "",
    refreshToken: "",
    userId: "",
    role: [],
  },
  loginStatus: "",
  admin: "",
  currentEmployee: {},
};

const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  isAdmin(state) {
    if (state.authData.role[0] === "ROLE_ADMIN") {
      return state.admin == 0;
    } else return false;
  },  
};

const mutations = {
  SAVE_TOKEN_DATA(state, data) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("userId", data.userId);

    const jwtDecodeEmployeeInfo = jwtDecrypt(data.access_token);

    const newTokenData = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      userId: data.userId,
      role: jwtDecodeEmployeeInfo.authorities,
    };

    state.authData = newTokenData;
  },
  SET_LOGIN_STATUS(state, value) {
    state.loginStatus = value;
  },
  SET_CURRENT_EMPLOYEE(state, currentEmployee) {
    state.currentEmployee = currentEmployee;
  },
  REMOVE_TOKEN_DATA(state) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    state.authData.token = "";
    state.authData.refreshToken = "";
    state.authData.userId = "";
  },
};

const actions = {
  async login({ commit, dispatch }, payload) {
    const response = await axios
      .post("http://localhost:8085/oauth/token", payload, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .catch((error) => {
        console.log(error);
      });

    if (response && response.data) {
      commit("SAVE_TOKEN_DATA", response.data);
      commit("SET_LOGIN_STATUS", "success");
      dispatch("getCurrentEmployee");
    } else {
      commit("SET_LOGIN_STATUS", "failed");
    }
  },
  getCurrentEmployee({ commit }) {
    jwtInterceptor
      .get("userInfo")
      .then(({ data }) => commit("SET_CURRENT_EMPLOYEE", data));
  },
  logout({ commit }) {
    commit("REMOVE_TOKEN_DATA");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
