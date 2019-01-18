<template>
  <input id="qr_upload" @change="previewFiles" type="file">
</template>

<script>
  export default {
    name: 'qr upload',
    data () {
      return {}
    },
    methods: {
      previewFiles (event) {
        console.log(event.target.files)
      }
    }
  }
</script>

<style scoped>
#qr_upload {
  display: none;
}
</style>
