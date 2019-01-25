<template>
  <v-card dark data-app class="friend-search">
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      hide-details
      class="search-bar"
    ></v-text-field>
    <v-data-table
      hide-headers
      :items="items"
      sort-icon="mdi-sort-alphabetical"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td v-on:click="$emit('selectItem', props.item)">{{ props.item.name }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="purple darken-3" icon="warning">
          Nothing here 😭
        </v-alert>
      </template>
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
      search: '',
      headers: [
        {
          sortable: true,
          value: 'name'
        }
      ]
    }
  },
  watch: {
    search: {
      handler: function (newSearch) {
        this.$emit('search', newSearch)
      }
    }
  }
}

</script>
<style scoped>
.search-bar {
  margin: 10px;
  padding-top: 18px;
}

.friend-search {
  top: 40px;
}
</style>
