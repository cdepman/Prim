<template>
  <v-dialog
    v-model="showAddFriendDialog"
    max-width="500px"
    dark
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
            <v-text-field
              v-model="person.lastName"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="person.birthdate"
              label="Birthdate"
            ></v-text-field>
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
          @click="$emit('addPerson', person)"
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
      formTitle: 'Add Friend'
    }
  },
  props: {
    showAddFriendDialog: Boolean,
    person: Object
  }
}
</script>
