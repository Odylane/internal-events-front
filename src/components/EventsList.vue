<template>
  <v-container class="blue lighten-5">
    <v-row>
      <EventTypeFilter :selectedEventType.sync ="nameEventType" />
      <v-col v-for="event in filterByEventype" :key="event.id" xs="12" sm="12" md="3">
        <v-card class="d-flex flex-column" height="100%" tile>
          <v-card-text>
            <div class="overline mb-1">{{ event.nameEventType }}</div>
            <div class="title text--primary">{{ event.title }}</div>
            <div class="subtitle-1">
              {{ formatDateTime(event.startDateTime) }}<br />
              <p class="subtitle-2">
                <br />
                <span> {{ event.nameBuilding }} </span><br />
                <span>Salle {{ event.nameRoom }}
                </span>
              </p>
            </div>
          </v-card-text>
          <v-spacer />
          <v-card-actions>
            <router-link
              :to="{ name: 'eventDetails', params: { id: event.id } }"
              >En savoir plus
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import EventTypeFilter from "./EventTypeFilter.vue";

export default {
  components: { EventTypeFilter },
  name: "events-list",
  title: "Internal Events - Liste des événements internes",
  data() {
    return {
      nameEventType:"",
    };
  },
  computed: {
    events() {
      return this.$store.state.event.events;
    },
    filterByEventype() {
      let result = this.events;
      
      if (this.nameEventType) result = result.filter(event => event.nameEventType === this.nameEventType);
      
      return result;
    }
  },
  methods: {
    formatDateTime(dateTime) {
      moment.locale("fr");
      return moment(dateTime).format("ddd ll [à] LT");
    },
  },

  mounted() {
    this.$store.dispatch("event/getEvents");
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 100px;
}
</style>
