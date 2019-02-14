<template>
  <v-dialog
    v-model="showAddNote"
    max-width="500px"
    dark
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          New Note
        </span>
      </v-card-title>

      <v-card-text>
        <v-layout justify-center column fill-height>
            <v-text-field
              v-model="note.title"
              placeholder="Title"
              solo
            ></v-text-field>
            <v-textarea
              v-model="note.content"
              placeholder="Note"
              auto-grow
              full-width
              solo
            ></v-textarea>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('hideAddNoteDialog')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="saveNote"
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
      note: {
        title: '',
        content: ''
      }
    }
  },
  props: {
    showAddNote: Boolean
  },
  methods: {
    saveNote () {
      this.$emit('addNote', this.note)
      this.$emit('hideAddNoteDialog')
      this.note = { title: '', content: '' }
    }
  }
}
</script>
