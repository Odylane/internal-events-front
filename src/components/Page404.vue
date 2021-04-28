<template>
  <v-container>
    <v-fade-transition mode="out-in">
      <v-row justify="center">
        <v-col cols="6">
          <v-img
            src="@/assets/error404.jpg"
            alt="page 404"
            @click="$router.push('/events')"
          ></v-img>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
export default {
  name: "Page404",
  title: "Page 404 - Internal Events",
};
</script>
