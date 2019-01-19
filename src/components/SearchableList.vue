<template>
  <v-card dark data-app>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      hide-details
      class="search"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-icon="mdi-sort-alphabetical"
      hide-actions
    >
      <template slot="headers" slot-scope="props">

      </template>
      <template slot="items" slot-scope="props">
        <td v-on:click="$emit('selectItem', props.item)">{{ props.item.fullName() }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here
        </v-alert>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Couldn't find "{{ search }}" 😫 Try another spelling?
      </v-alert>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: {
    items: Array
  },
  data () {
    return {
      search: ''
    }
  }
}
</script>
<style scoped>
.search {
  margin: 10px;
  padding-top: 18px;
}
</style>
