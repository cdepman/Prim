<template>
  <v-dialog
    v-model="showFriendDetailDialog"
    max-width="500px"
    dark
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ selectedFriend.fullName() }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-layout justify-center column fill-height>
            <v-text-field
              v-model="selectedFriend.birthdate"
              label="Birthday"
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
          @click="$emit('updatePerson', selectedFriend)"
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
    showFriendDetailDialog: Boolean,
    selectedFriend: Object
  }
}
</script>
