<template>
  <v-app dark style="overflow: hidden; position: fixed; width: 100%;">
    <loading-animation v-bind="{ showLoading }"></loading-animation>
    <landing v-bind="{ demoMode }" v-on:demoMode="demoMode = true" v-if="isSignedOut() && !demoMode"></landing>
    <dashboard
      v-on:stopDemoMode="demoMode = false" 
      v-if="blockstackUser || demoMode" 
      :demoMode="demoMode" 
      :blockstackUser="blockstackUser"
    ></dashboard>
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
      this.blockstackUser = new blockstack.Person(this.userData.profile)
      this.blockstackUser.username = this.userData.username
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
      blockstackUser: null,
      showLoading: false,
      demoMode: false
    }
  },
  methods: {
    isSignedOut () {
      return !this.blockstack.isUserSignedIn()
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>
