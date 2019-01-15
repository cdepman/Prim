<template>
  <div>
    <v-btn
      color="primary"
      dark
      class="mb-2"
      v-on:click="drawQRCode"
    >Generate QR Code</v-btn>
    <canvas id="qr_canvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  props: {
    qrContents: String
  },
  methods: {
    drawQRCode: function () {
      const canvas = document.getElementById('qr_canvas')
      QRCode.toCanvas(canvas, this.qrContents, function (error) {
        if (error) console.error(error)
        console.log('qr draw success! 🎉')
      })
    }
  }
}
</script>

<style scoped>
.friend-detail {
  width: 100%;
  margin-left: 1px;
}
.edit {
  align-self: flex-end;
}
</style>

  const QRCode = require('qrcode')
  const canvas = document.getElementById('qr_canvas')
  
  QRCode.toCanvas(canvas, 'sample text', function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
</script>

<style scoped>

</style>
