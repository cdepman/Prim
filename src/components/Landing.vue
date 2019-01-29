<template>
  <v-flex>
    <v-content>
      <v-card>
        <v-img
          src="https://i.pinimg.com/originals/2e/c5/a7/2ec5a7c9f7d16d1861a6cf0f87ba8594.jpg"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">Prim</div>
            <span class="grey--text">
              A secure, decentralized personal relationship manager built on <a href="https://blockstack.org" target="_blank">Blockstack</a>.
            </span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn small @click.prevent="signIn">Log In With Blockstack</v-btn>
          <v-btn small>
            <a href="https://blockstack.org/faq/">
              Learn More
            </a>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            Own your data - Prim provides a secure space to collect, synthesize, and utilize
            information about the people who matter in your life. All computations relating to your data
            happen on your device, <bold>never</bold> through a centralized server.
            Share locally - Choose who you share your personal information with using single-time-use QR codes.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-content>
  </v-flex>
</template>

<script>
export default {
  name: 'landing',
  data: () => ({
    show: true,
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
