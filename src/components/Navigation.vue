<template>
  <v-card flat>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="purple darken-3"
    >
      <v-btn
        flat
        value="add"
      >
        <i class="material-icons md-36">person_add</i>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="show"
        v-on:click="triggerQrShow"
      >
        <i class="fas fa-qrcode fa-3x"></i>
      </v-btn>

      <v-btn
        flat
        value="scan"
        v-on:click="scanQR"
      >
        <i class="fas fa-camera fa-2x"></i>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
