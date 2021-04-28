import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import CreateEventForm from "@/components/CreateEventForm.vue";
import Events from "@/views/Events.vue";
import store from "@/store";
import Profile from "@/components/Profile.vue";
import Logout from "@/views/Logout.vue";
import TopicsList from "@/components/TopicsList.vue";
import TopicForm from "@/components/TopicForm.vue";
import Page404 from "@/components/Page404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/register",
    name: "RegistrationForm",
    component: RegistrationForm,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: "/events",
    name: "events",
    component: Events,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/events/create",
    name: "createEventForm",
    component: CreateEventForm,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/events/:id",
    name: "eventDetails",
    // lazy-loaded
    component: () => import("@/views/EventDetails.vue"),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/topics",
    name: "topics-list",
    component: TopicsList,
    meta: {
      requiredAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/topics/add",
    name: "topic-add",
    component: TopicForm,
    meta: {
      requiredAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: TopicsList,
    meta: {
      requiredAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "*",
    name: "Page404",
    component: Page404,
    meta: {
      requiredAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //if no token, retrieve from localstorage
  if (!store.state.auth.authData.token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    //save in the store
    if (access_token) {
      const data = {
        access_token,
        refresh_token,
        userId,
        role,
      };
      store.commit("auth/SAVE_TOKEN_DATA", data);
    }
  }
  //retrieve token, rôle isAdmin
  const auth = store.state.auth.authData.token;
  const isAdmin = store.getters["auth/isAdmin"];

  //if auth not necessary, requiredAuth=false
  if (!to.meta.requiredAuth) {
    next();
    //meta.isAdmin=true and role is not Admin
  } else if (to.meta.isAdmin && !isAdmin) {
    return next({ path: "events" });
    // auth and requiredAuth=true
  } else if (auth && to.meta.requiredAuth) {
    next();
    // navigation guard for page 404
  } else if (auth && !to.meta.requiredAuth) {
    return next({ path: "*" });
  
  } else if (!auth && to.meta.requiredAuth) {
    return next({ path: "/" });
  }
  return next();
});

export default router;
