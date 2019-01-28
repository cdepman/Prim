<template>
<div>
  <note-detail-dialog
    v-if="selectedNote"
    v-bind="{ selectedNote, showNoteDetail }"
    v-on:closeNoteDetail="selectedNote = null; showNoteDetail = false">
  </note-detail-dialog>
  <v-dialog
    v-model="showFriendDetailDialog"
    fullscreen
    hide-overlay
    dark
    transition="dialog-bottom-transition"
  >
    <v-card raised>
      <v-card-title>
        <span class="headline">
          {{ selectedFriend.name }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          :disabled="disabled"
          v-model="selectedFriend.name"
          label="Name"
        >
          <i
            :class="editIconClass"
            slot="append"
            class="edit-friend fas fa-edit fa-1x"
            v-on:click="edit">
          </i>
        </v-text-field>
        <v-layout row-wrap fill-height>
          <div v-if="selectedFriend.notes.length">
            <div v-for="note in selectedFriend.notes" v-bind:key="note.id">
              <v-chip v-on:click="selectedNote = note; showNoteDetail = true">
                {{ note.title }}
              </v-chip>
            </div>
          </div>
          <v-chip>
            Add a note
            <v-icon right>add</v-icon>
          </v-chip>
        </v-layout>
      </v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn
          block
          color="blue darken-1"
          @click="hideFriendDialog"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>
<script>
import NoteDetailDialog from './NoteDetailDialog.vue'

export default {
  components: {
    NoteDetailDialog
  },
  data () {
    return {
      disabled: true,
      selectedNote: null,
      showNoteDetail: false
    }
  },
  props: {
    showFriendDetailDialog: Boolean,
    selectedFriend: Object
  },
  methods: {
    edit () {
      console.log('edit')
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
