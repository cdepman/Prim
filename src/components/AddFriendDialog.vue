<template>
  <v-dialog
    v-model="showAddFriendDialog"
    max-width="500px"
    dark
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ formTitle }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-layout justify-center column fill-height>
            <v-text-field
              v-model="person.name"
              label="Name"
            ></v-text-field>
            <div v-for="note in person.notes" v-bind:key="note.id">
              <v-text-field
                v-model="note.title"
                label="Note Title"
              ></v-text-field>
              <v-text-field
                v-model="note.content"
                label="Note Content"
              ></v-text-field>
            </div>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('hideAddFriendDialog')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('hideAddFriendDialog'); $emit('addPerson', person)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      formTitle: 'Add Entry'
    }
  },
  props: {
    showAddFriendDialog: Boolean,
    person: Object
  }
}
</script>
