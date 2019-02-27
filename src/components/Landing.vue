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
              A secure, decentralized personal relationship manager.
            </span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn small @click.prevent="signIn">Log In (Blockstack)</v-btn>
          <v-btn color="purple darken-3" small @click.prevent="$emit('demoMode')">Try the App</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text>
            <span id="logo_letters">Own your data</span> - Prim provides a safe space to collect, synthesize, and utilize
            information about the people who matter in your life. All computations relating to your data
            happen on your device, <strong>never</strong> through a centralized server. Your data is encrypted,
            secured and stored so only you can decrypt it. Share your profile intimately with single-time-use QR codes.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-content>
  </v-flex>
</template>

<script>
export default {
  name: 'landing',
  data: () => ({ blockstack: window.blockstack }),
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
#logo_letters {
  text-align: center;
  background: linear-gradient(to right, pink 20%, purple 40%, violet 60%, turquoise 80%);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: shine 6s linear infinite;
          animation: shine 6s linear infinite;
}
@-webkit-keyframes shine {
  to {
    background-position: 200% center;
  }
}
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
