<template>
  <v-card :style="containerStyle">
    <v-text-field
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
      containerStyle: `background: none; 
                       position: fixed;
                       z-index: 10; 
                       right: 0px; 
                       width: 100%; 
                       padding-right: 15px; 
                       padding-left: 15px; 
                       box-shadow: none;
                       top: 65px;`
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
