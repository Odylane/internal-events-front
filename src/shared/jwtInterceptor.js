import axios from "axios";
import store from "@/store";

const jwtInterceptor = axios.create({ baseURL: "http://localhost:8085/api/" });

//Add a request interceptor
jwtInterceptor.interceptors.request.use(
  (config) => {
    const authData = store.state.auth.authData;
    config.headers.common["Authorization"] = "Bearer " + authData.token;
    return config;
  }
);

// Add a response interceptor
jwtInterceptor.interceptors.response.use(
  (response) => {
    if ([200, 201].indexOf(response.status) !== -1) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if ([401, 403].indexOf(error.response.status) !== -1) {
      this.$router.push("login");
    } else if ([400,404].indexOf(error.response.status) !== -1) {
      const str = error.response.data.errors.toString();
      
      alert(str);
    }

    return Promise.reject(error.response);
  }
);
export default jwtInterceptor;
