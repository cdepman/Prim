<template>
  <div class="text-xs-center">
    <v-dialog
      dark
      v-model="showSignOutDialog"
      width="300"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Sign Out
        </v-card-title>

        <v-card-text>
          Are you sure you want to sign out?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="$emit('hideSignOutDialog')"
          >
            No
          </v-btn>

          <v-btn
            color="red darken-1"
            @click="signOut"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AuthenticationService from '../services/Authentication.js'

export default {
  props: {
    showSignOutDialog: Boolean
  },
  methods: {
    signOut () {
      AuthenticationService.signUserOut()
    }
  }
}
</script>

