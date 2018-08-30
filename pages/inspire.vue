<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      {{ this.$store.state.ds }}

      <p>--</p>
      {{ this.$store.state.y }}
      <!-- <p v-for="ds in this.$store.state.ds" :key="ds">{{ ds }}</p> -->
      <!-- <p v-for="i in this.$store.state.y" :key="i">{{ i }}</p> -->
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
