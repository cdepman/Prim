<template>
  <v-content row>
    <v-card>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      >
      </v-img>

      <v-card-title primary-title>
        <div>
          <div class="headline">Prim</div>
          <span class="grey--text">
            A decentralized personal relationship manager built on <a href="https://blockstack.org" target="_blank">Blockstack</a>
          </span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat @click.prevent="signIn">Sign In With Blockstack</v-btn>
        <v-btn flat color="pink">Learn More</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">

        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: 'landing',
  data: () => ({
    show: false,
    blockstack: window.blockstack
  }),
  methods: {
    signIn () {
      const blockstack = this.blockstack
      blockstack.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
