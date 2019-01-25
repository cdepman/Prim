<template>
  <v-dialog
    v-model="showFriendDetailDialog"
    max-width="500px"
    dark
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ selectedFriend.name }}
        </span>
        <v-spacer/>
        <i :class="editIconClass" class="edit-friend fas fa-edit fa-2x" v-on:click="edit"> </i>
      </v-card-title>

      <v-card-text>
        <v-layout justify-center column fill-height>
            <v-text-field
              :disabled="disabled"
              v-model="selectedFriend.name"
              label="Name"
            ></v-text-field>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="hideFriendDialog"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      formTitle: 'Add Friend',
      disabled: true
    }
  },
  props: {
    showFriendDetailDialog: Boolean,
    selectedFriend: Object
  },
  methods: {
    edit () {
      this.disabled = !this.disabled
    },
    hideFriendDialog () {
      this.$emit('hideAddFriendDialog')
      this.disabled = true
    }
  },
  computed: {
    editIconClass () {
      return this.disabled ? '' : 'edit-friend-active'
    }
  }
}
</script>
<style>
.headline {
  color: white;
}
.edit-friend {
  color: #2D9841;
}
.edit-friend-active {
  text-shadow: -1px -1px 2px white;
}
</style>
