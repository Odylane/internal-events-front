<template>
  <v-container>
    <v-form v-model="valid" id="formEvent">
      <h1 class="display-1 font-weight-bold mb-6 text-center">
        Créer un événement
      </h1>

      <div>
        <v-text-field
          v-model="title"
          :counter="75"
          :rules="titleRules"
          hint="Le titre ne doit pas dépasser 75 caractères"
          label="Titre de l'événement*"
          required
        ></v-text-field>
      </div>

      <v-text-field
        v-model="speakerName"
        :counter="255"
        :rules="speakerNameRules"
        hint="Le nom de l'intervenant peut comporter au maximum 255 caractères"
        label="Nom de l'intervenant*"
        required
      ></v-text-field>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            class="pa-2"
            v-model="eventTypeId"
            :items="eventTypes"
            label="Sélectionnez un type d'événement*"
            item-text="name"
            item-value="id"
            clearable
            required
          >
          </v-select>
        </v-col>
        <v-col sm="6" md="6">
          <v-text-field
            v-model="numberOfAttendees"
            :rules="numberOfAttendeesRules"
            min="2"
            type=number
            placeholder="2 participants minimum"
            label="Nombre de participants*"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-select
        v-model="topicId"
        :items="topics"
        label="Sélectionnez une thématique*"
        item-text="name"
        item-value="id"
        clearable
        required
      ></v-select>

      <v-select
        v-model="roomId"
        :items="rooms"
        label="Sélectionnez une salle de réunion*"
        item-text="name"
        item-value="id"
        clearable
        required
      ></v-select>

      <div>
        <label for="startDateTime">Date et heure de début* : </label>
        <input
          v-model="startDateTime"
          type="datetime-local"
          id="startDateTime"
          name="startDateTime"
          required
        />
      </div>
      <div>
        <label for="endDateTime">Date et heure de fin* : </label>
        <input
          v-model="endDateTime"
          type="datetime-local"
          id="endDateTime"
          name="endDateTime"
        />
      </div>

      <div>
        <v-textarea
          solo
          auto-grow
          v-model="description"
          :counter="2000"
          :rules="descriptionRules"
          hint="La description ne doit pas dépasser 2000 caractères"
          label="Description*"
          rows="5"
          row-height="30"
          required
        ></v-textarea>
      </div>

      <small>*Champs obligatoires</small>

      <v-card-actions>
        <v-btn
          class="white--text d-flex justify-end"
          :disabled="!valid"
          color="success"
          @click.prevent="saveEvent"
          >Sauvegarder</v-btn
        >
      </v-card-actions>
    </v-form>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import jwtInterceptor from "@/shared/jwtInterceptor";

export default {
  name: "CreateEvent",
  title: "Créer un événement - Internal Events",
  data: () => ({
    title: "",
    speakerName: "",
    eventTypeId: "",
    numberOfAttendees: "",
    topicId: "",
    roomId: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
    valid: true,
    show1: false,
    titleRules: [
      (value) => !!value || "Veuillez saisir un titre (75 caractères maximum).",
      (value) => (value && value.length <= 75) || "Titre invalide.",
    ],
    descriptionRules: [
      (value) =>
        !!value || "Veuillez saisir une description (2000 caractères maximum).",
      (value) => (value && value.length <= 2000) || "Description invalide.",
    ],

    numberOfAttendeesRules: [
      (value) =>
        !!value || "Veuillez saisir un nombre de participants (2 participants minimum).",
      (value) => (value >= 2 ) || "Nombre de participants invalide.",
    ],
    speakerNameRules: [
      (value) =>
        !!value ||
        "Veuillez saisir le nom d'un intervenant (255 caractères maximum).",
      (value) =>
        (value && value.length <= 255) || "Nom de l'intervant invalide.",
    ],
    multiLine: true,
    snackbar: false,
    text: `Votre événement est publié`,
  }),
  created() {
    this.getAllEventTypes(), this.getAllTopics(), this.getAllRooms();
  },
  computed: {
    ...mapState("list", ["eventTypes", "topics", "rooms"]),
  },
  methods: {
    ...mapActions("list", ["getAllEventTypes", "getAllTopics", "getAllRooms"]),

    saveEvent() {
      let data = {
        title: this.title,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime,
        description: this.description,
        numberOfAttendees: this.numberOfAttendees,
        speakerName: this.speakerName,
        eventTypeId: this.eventTypeId,
        topicId: this.topicId,
        roomId: this.roomId,
      };

      jwtInterceptor.post("events", data).then(
        (response) => {
          const status = response.request.status;
          if (status == 200) {
            this.snackbar = true;
            //this.$router.push("/events");
          }
        },
      );
    },
  },
};
</script>

<style>
#formEvent {
  width: 800px;
  padding: 1em;
  border: 1px solid #ccc;
}

form div + div {
  margin-top: 1em;
}
</style>
