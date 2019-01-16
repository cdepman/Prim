<template>
  <div>
    <h1 class="page-header">Prim
      <span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span>
    </h1>
    <h2 class="user-info">
      <small>
        {{ user.name() ? user.name() : 'Anonymous User' }}
      </small>
      <small class="pull-right">
        Powered by <a href="https://blockstack.org">blockstack</a>
      </small>
    </h2>
  </div>
</template>

<script>
import AuthenticationService from '../services/Authentication.js'

export default {
  props: {
    user: Object
  },
  methods: {
    signOut () {
      AuthenticationService.signUserOut()
    }
  }
}
</script>
