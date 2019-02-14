<template>
  <v-card>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      hide-details
      outline
      color="purple darken-3"
    ></v-text-field>
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
      right: false,
      bottom: true,
      left: true,
      transition: 'slide-y-reverse-transition',
      search: ''
    }),
    watch: {
      search: {
        handler: function (newSearch) {
          this.$emit('search', newSearch)
        }
      }
    }
  }
</script>
