<template>
  <v-layout row justify-center>
    <v-dialog v-model="showLoading" fullscreen content: class="loading" content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <fingerprint-spinner :animation-duration="1500" :size="64" :color="progressColor" />
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
<script>
import { FingerprintSpinner } from 'epic-spinners'

export default {
  name: 'Loading',
  components: {
    FingerprintSpinner
  },
  props: {
    showLoading: {
      type: Boolean,
      default: false
    },
    progressColor: {
      type: String,
      default: '#FFFFFF'
    }
  }
}
</script>

<style scoped>
.dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
.loading {
  background: rgba(255, 56, 23, 0.4)
}
</style>
