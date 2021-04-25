<template>
  <v-container>
    <v-form class="ma-10 pa-10" v-model="valid" id="formTopic">
      <h1 class="display-1 font-weight-bold mb-2 text-center">
        Ajouter une thématique
      </h1>

      <div>
        <v-text-field
          v-model="name"
          :counter="45"
          :rules="nameRules"
          hint="Le nom de la thématique ne doit pas dépasser 45 caractères"
          label="Nom de la thématique*"
          required
        ></v-text-field>
      </div>

      <small>*Champ obligatoire</small>

      <v-card-actions>
        <v-btn
          class="white--text d-flex justify-end"
          :disabled="!valid"
          color="success"
          @click.prevent="saveTopic"
          >Sauvegarder</v-btn
        >
      </v-card-actions>
    </v-form>

    <v-btn class="ml-10"
      ><router-link to="/topics"
        >Retour à la liste des thématiques</router-link
      ></v-btn
    >
    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.show"
      :multi-line="multiLine"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import jwtInterceptor from "@/shared/jwtInterceptor";

export default {
  name: "TopicForm",
  title: "Internal Events - Ajouter une thématique",
  data: () => ({
    name: "",
    error: "",
    valid: true,
    nameRules: [
      (value) => !!value || "Veuillez saisir un nom (45 caractères maximum).",
      (value) =>
        (value && value.length <= 45) ||
        "Nom invalide, veuillez saisir un nom (45 caractères maximum).",
    ],
    multiLine: true,
    snackbar: {
      show: false,
      message: null,
      color: null,
    },
  }),

  methods: {
    saveTopic() {
      let data = {
        name: this.name,
      };

      jwtInterceptor.post("topics", data).then((response) => {
        const status = response.request.status;
        if (status == 201) {
          this.snackbar = {
            message: "La thématique est enregistrée",
            color: "success",
            show: true,
          };
          setTimeout(() => this.$router.push("/topics"), 3000);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#formTopic {
  width: 800px;
  padding: 1em;
  border: 1px solid #ccc;
}

form div + div {
  margin-top: 1em;
}
</style>
