<template>
  <v-layout row justify-center>
    <v-dialog v-model="showNoteDetail" persistent dark scrollable max-width="300px">
      <v-card>
        <v-card-title>{{ selectedNote.title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          {{ selectedNote.content }}
        </v-card-text>
        <v-divider></v-divider>
        <v-btn color="gray darken-1" @click="$emit('closeNoteDetail')">Close</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    selectedNote: Object,
    showNoteDetail: Boolean
  }
}
</script>
