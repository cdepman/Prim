<template>
  <v-bottom-nav
    :value="true"
    color="purple darken-3"
    fixed
  >
    <v-btn
      flat
      value="add"
      v-on:click="$emit('showAddFriendDialog')"
    >
      <i class="material-icons md-36">person_add</i>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="show"
      v-on:click="$emit('showQR')"
    >
      <i class="fas fa-qrcode fa-3x"></i>
    </v-btn>

    <v-btn
      flat
      value="scan"
      v-on:click="$emit('logOut')"
    >
      <i class="fas fa-camera fa-2x"></i>
    </v-btn>
  </v-bottom-nav>
</template>
