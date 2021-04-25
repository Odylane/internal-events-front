<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-lg-auto" max-width="1000">
          <v-card-text>
            <h1 class="display-1 font-weight-bold mb-6 text-center">
              Mon profil
            </h1>

            <div>Identifiant : {{ currentEmployee.username }}</div>

            <div>Prénom : {{ currentEmployee.firstname }}</div>

            <div>Nom : {{ currentEmployee.lastname }}</div>

            <div>Email : {{ currentEmployee.email }}</div>
            
          </v-card-text>
          <v-card-actions>
            <BackEventsList />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BackEventsList from "../components/BackEventsList";

export default {
  name: "Profile",
  title: "Internal Events - Profil",
  components: { BackEventsList },

  computed: {
    ...mapState("auth",["currentEmployee"]),
  },

  methods: {
    ...mapActions("auth", ["getCurrentEmployee"]),
  },

  mounted() {
    this.$store.dispatch("auth/getCurrentEmployee");
  },
};
</script>
