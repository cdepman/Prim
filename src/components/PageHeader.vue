<template>
  <v-toolbar dense fixed>
  <logo-animation/>
    <v-toolbar-title id="app_title">Prim</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-chip color="purple dark-3" id="user_chip" @click="$emit('editProfile')">
        <i class="fas fa-edit fa-1x" style="padding-right: 5px;"></i>
        {{ user.name || blockstackUser.username }}
      </v-chip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import LogoAnimation from './LogoAnimation'

export default {
  props: {
    user: Object,
    blockstackUser: Object
  },
  components: { LogoAnimation }
}
</script>
<style scoped>
#user_chip {
  top: 8px;
  height: 26px;
}

#app_title {
  margin-left: 5px;
}
</style>
