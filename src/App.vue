<template>
  <v-app dark style="overflow: hidden">
    <loading-animation v-bind="{ showLoading }"></loading-animation>
    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <dashboard v-if="user" :user="user"></dashboard>
  </v-app>
</template>

<script>

import LoadingAnimation from './components/LoadingAnimation.vue'
import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: { Landing, Dashboard, LoadingAnimation },
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (blockstack.isSignInPending()) {
      this.showLoading = true
      blockstack.handlePendingSignIn()
      .then((userData) => {
        this.showLoading = false
        window.location = window.location.origin
      })
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null,
      showLoading: false
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>
