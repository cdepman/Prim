<template>
  <div>
    <note-detail-dialog
      v-if="selectedNote"
      v-bind="{ selectedNote, showNoteDetail }"
      v-on:closeNoteDetail="selectedNote = null; showNoteDetail = false">
    </note-detail-dialog>
    <add-note-dialog
      v-bind="{ showAddNote }"
      v-on:hideAddNoteDialog="showAddNote = false"
      v-on:addNote="addNote"
    >
    </add-note-dialog>
    <v-dialog
      v-model="showFriendDetailDialog"
      fullscreen
      hide-overlay
      dark
      transition="dialog-bottom-transition"
    >
      <v-card id="friend_detail" raised>
        <v-card-title>
          <span class="headline">
            {{ selectedFriend.name }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-layout row-wrap fill-height>
            <div v-if="selectedFriend.notes.length">
              <v-chip v-for="note in selectedFriend.notes" v-bind:key="note.id" v-on:click="selectedNote = note; showNoteDetail = true">
                {{ note.title }}
              </v-chip>
            </div>
          </v-layout>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            block
            color="blue darken-1"
            @click="showAddNote = true"
          >
            Add a note
          </v-btn>
          <v-btn
            block
            color="blue darken-1"
            @click="hideFriendDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import NoteDetailDialog from './NoteDetailDialog.vue'
import AddNoteDialog from './AddNoteDialog.vue'

export default {
  components: { NoteDetailDialog, AddNoteDialog },
  data () {
    return {
      disabled: true,
      selectedNote: null,
      showNoteDetail: false,
      showAddNote: false
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
    },
    addNote (note) {
      console.log('new note!', note)
      const selectedFriend = this.selectedFriend
      this.$emit('addNote', { selectedFriend, note })
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
#friend_detail {
  display: flex;
  flex-direction: column;
}
.headline {
  color: white;
}
.edit-friend {
  color: #2D9841;
}
.edit-friend-active {
  text-shadow: -1px -1px 2px white;
}
v-card-actions {
  flex-direction: column;
}
</style>
