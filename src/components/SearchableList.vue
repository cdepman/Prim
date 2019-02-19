<template>
  <v-card dark data-app class="friend-list">
    <v-flex style="overflow: scroll">
      <v-data-table
        hide-headers
        :items="items"
        sort-icon="mdi-sort-alphabetical"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td v-on:click="$emit('selectItem', props.item)">{{ props.item.name }}</td>
          <td class="note-count" v-on:click="$emit('selectItem', props.item)" right>
            <circles-to-rhombuses-spinner
              :animation-duration="1200"
              :circles-num="props.item.notes.length"
              :circle-size="6"
              color="#ff1d5e"
            />
          </td>
          <td class="note-count" v-on:click="$emit('selectItem', props.item)">
            {{ props.item.notes.length }}
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-card>
</template>
<script>
import { CirclesToRhombusesSpinner } from 'epic-spinners'
export default {
  props: {
    items: Array
  },
  components: { CirclesToRhombusesSpinner },
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

.friend-list {
  top: 140px;
  position: absolute;
  right: 15px;
  left: 15px;
}
</style>
