<template>
  <v-card style="background: none;">
    <v-text-field
      :style="style"
      v-model="search"
      append-icon="search"
      label="Search"
      hide-details
      outline
      color="purple darken-3"
      class="search"
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
      search: '',
      style: 'padding-top: 50px'
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
