<template>
  <v-container fluid>
    <v-col cols="3">
    <v-select
      v-model="selectedEventType"
      :items="eventTypes"
      label="Quels types d'événements ?"
      item-text="name"
      item-value="name"
      clearable
      @change="filterByEventType"
    >
    </v-select>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    selectedEventType: {
      type: String,
      default: "",
    },
  },
  created() {
    this.getAllEventTypes();
  },
  computed: {
    ...mapState("list", ["eventTypes"]),
  },
  methods: {
    ...mapActions("list", ["getAllEventTypes"]),
    filterByEventType() {
      this.$emit("update:selectedEventType", this.selectedEventType);
    },
    
  },
};
</script>

<style></style>
