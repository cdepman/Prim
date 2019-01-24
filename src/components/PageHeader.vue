<template>
  <v-toolbar>
    <v-toolbar-title>Prim</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="$emit('showUserDetail')">
        {{ user.username }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
