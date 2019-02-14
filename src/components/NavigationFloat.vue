<template>
  <v-card>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      open-on-hover
      :transition="transition"
      fixed
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="purple darken-3"
        dark
        fab
        @click="fab = !fab"
      >
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        medium
        color="#A0398C"
        v-on:click="$emit('showAddFriendDialog')"
      >
        <i class="action-icon material-icons md-36">person_add</i>
      </v-btn>
      <v-btn
        fab
        dark
        medium
        color="#5B725F"
        v-on:click="$emit('showQR')"
      >
        <i class="action-icon fas fa-qrcode fa-2x"></i>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        v-on:click="$emit('showSignOutDialog')"
      >
        <i class="action-icon fas fa-sign-out-alt fa-1x"></i>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    })
  }
</script>
<style scoped>
.v-speed-dial {
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  bottom: 30px;
  right: 30px;
}
.action-icon {
  color:#212121;
}
</style>

