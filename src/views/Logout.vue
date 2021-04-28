<template>
  <v-container>
    <v-row justify="center">
      <h1 class="mt-10" @mousemove="setTimeout">
        {{ currentEmployee.firstname }}, merci pour votre visite !
      </h1>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LogoutPage",
  title: "Se déconnecter - Internal Events",

  computed: {
    ...mapState("auth", ["currentEmployee"]),
  },

  methods: {
    setTimeout() {
      this.$router.push("/"), 100;
      localStorage.clear();
    },
  },
};
</script>

