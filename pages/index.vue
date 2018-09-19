<template>
  <v-container>
    <v-flex
      xs12
      align-center
      justify-center
      text-xs-center
      class="my-5"
    >
      <v-avatar
        :size="200"
        class="elevation-8"
      >
        <img 
          src="https://raw.githubusercontent.com/Bud-Fox/live/master/bud.jpg"
          alt="bud fox avatar"
        >
      </v-avatar>
      <blockquote class="blockquote my-5">
        <h6 class="subheading">&#8220;The generated chart it's not a prophecy, take it just like one more indicator&#8220;</h6>
        <footer>
          <small>
            <em>&mdash; Bud Fox</em>
          </small>
        </footer>
      </blockquote>
      <v-btn
        color="secondary"
        large
        fab
        @click="ping"
        to="/ask"
      >Ok</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    ping () {
      axios.get('https://radiant-forest-48616.herokuapp.com/ping')
      .then(res => {
        console.log('Server says:', res.data)
      })
    }
  }
}
</script>
