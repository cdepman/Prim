<template>
  <v-layout row justify-center>
    <v-dialog v-model="showNoteDetail" persistent dark scrollable max-width="300px">
      <v-card>
        <v-card-title>
          <span v-if="!editNote" class="headline">
            {{ selectedNote.title }}
          </span>
          <v-text-field
            v-if="editNote"
            v-model="selectedNote.title"
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <span v-if="!editNote" class="headline">
              {{ selectedNote.content }}
            </span>
            <v-text-field multi-line solo
              rows="14"
              v-if="editNote"
              v-model="selectedNote.content"
            ></v-text-field>
          </v-card-text>
        <v-divider></v-divider>
        <v-btn
          v-on:click="editNote = !editNote"
        >{{ editNote ? 'save' : 'edit' }}</v-btn>
        <v-btn color="gray darken-1" @click="$emit('closeNoteDetail')">Close</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      editNote: false
    }
  },
  props: {
    selectedNote: Object,
    showNoteDetail: Boolean
  }
}
</script>
<style scoped>
</style>

