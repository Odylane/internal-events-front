<template>
  <v-container>
    <v-card class="mx-auto" max-width="1000">
      <v-card-text v-if="info">
        <div class="overline mb-1">{{ info.eventTypeName }}</div>

        <h1 class="title text--primary">{{ info.title }}</h1>
        <br />

        <div>
          Du
          <p class="text--primary">{{ formatDateTime(info.startDateTime) }}</p>
          au
          <p class="text--primary">{{ formatDateTime(info.endDateTime) }}</p>
        </div>
        <br />

        <div>Intervenant : {{ info.speakerName }}</div>
        <br />

        <div>Description : {{ info.description }}</div>
        <br />

        <div>Nombre de participants : {{ info.numberOfAttendees }}</div>
        <br />

        <div>Salle : {{ info.roomName }}</div><br/>

        <div>Immeuble : {{ info.roomBuildingName }}</div><br/>

        <div>Organisateur(trice) : {{ info.employeeOrganizerFirstname }} {{ info.employeeOrganizerLastname }}</div><br/>

        <v-btn
          ><router-link to="/events" tag="ul"
            >Retour à la liste des événements</router-link
          ></v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import jwtInterceptor from "@/shared/jwtInterceptor";

export default {
  name: "EventsDetails",
  title: "Internal Events - Fiche événement détaillé",
  data() {
    return {
      eventId: this.$route.params.id,
      info: null,
    };
  },
  computed: {
    event() {
      return this.$store.state.event.events.find(
        (event) => event.id === this.eventId
      );
    },
  },
  methods: {
    formatDateTime(dateTime) {
      moment.locale("fr");
      return moment(dateTime).format("dddd LL [à] LT");
    },
  },
  mounted() {
    jwtInterceptor
      .get("events/" + this.eventId)
      .then((response) => {this.info = response.data;});
      
      
  },
};
</script>

<style></style>
