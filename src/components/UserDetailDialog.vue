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
      v-model="showUserDetailDialog"
      fullscreen
      hide-overlay
      dark
      transition="dialog-bottom-transition"
    >
      <v-card id="friend_detail" raised>
        <v-card-title style="justify-content: space-between; height: 80px;">
          <span v-if="!editName" class="headline">
            {{ userData.name || blockstackUser.username }}
          </span>
          <v-text-field
            v-if="editName"
            v-model="userData.name"
            :placeholder="blockstackUser.username"
          ></v-text-field>
          <v-btn
            small
            v-on:click="editName = !editName"
            >{{ editName ? 'save' : 'edit' }}</v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row-wrap fill-height>
            <div v-if="userData.notes.length">
              <v-chip v-for="note in userData.notes" v-bind:key="note.id" v-on:click="selectedNote = note; showNoteDetail = true">
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
            color="gray darken-1"
            @click="showFriendDialog"
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
      showAddNote: false,
      editName: false
    }
  },
  props: {
    showUserDetailDialog: Boolean,
    userData: Object,
    blockstackUser: Object
  },
  methods: {
    edit () {
      this.disabled = !this.disabled
    },
    showFriendDialog () {
      this.$emit('hideAddFriendDialog')
      this.disabled = true
    },
    addNote (note) {
      console.log('new note!', note)
      this.$emit('addNoteToSelf', note)
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
