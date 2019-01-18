<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="showQR"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            v-on:click="hide"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              flat
              v-on:click="hide"
            >
              Close
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <canvas id="qr_canvas"></canvas>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import QRCode from 'qrcode'
import { sha256 } from 'js-sha256'

export default {
  props: {
    qrContents: String,
    showQR: Boolean
  },
  computed: {
    buttonText: function () {
      return this.showQR ? 'Hide' : 'Show'
    }
  },
  watch: {
    showQR: function (newVal, oldVal) {
      if (newVal === true) {
        this.drawQRCode()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    drawQRCode: function () {
      const canvas = document.getElementById('qr_canvas')
      const options = {
        color: {
          dark: '#003366'
        },
        width: window.innerWidth
      }
      QRCode.toCanvas(canvas, this.stampedContents(), options, error => {
        if (error) console.error(error)
        console.log('qr draw success! 🎉')
      })
    },
    stampedContents: function () {
      return this.qrContents + `[[[{${sha256(this.qrContents)}^_^${Date.now()}]]]`
    },
    hide: function () {
      this.$emit('hideQR')
    }
  }
}
</script>

<style scoped>
#qr_canvas {
  width: 100%;
}
</style>
