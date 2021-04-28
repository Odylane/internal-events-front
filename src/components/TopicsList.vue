<template>
  <v-container>
    <v-card class="mt-10 mb-5 pa-10 mx-auto" max-width="1000">
    <h1 class="display-1 font-weight-bold mb-2 text-center">
      Liste des thématiques
    </h1>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left font-weight-bold">
              NOM
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="topic in topics" :key="topic.id">
            <td>{{ topic.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-actions>
      <v-btn
        color="success"
        class="ma-10"
        ><router-link to="/topics/add"
      >Ajouter une thématique</router-link>
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TopicsList",
  title: "Liste des thématiques - Internal Events",
  created() {
    this.getAllTopics();
  },
  computed: {
    ...mapState("list", ["topics"]),
  },
  methods: {
    ...mapActions("list", ["getAllTopics"]),
  },
};
</script>

