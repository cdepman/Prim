<template>
  <div class="friend-detail" v-on:click="deselectFriend">
    <div class="friend-name">
      {{ friend.fullName().toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    friend: Object
  },
  methods: {
    deselectFriend: function () {
      this.$emit('friendDeselected')
    }
  }
}
</script>

<style scoped>
.friend-detail {
  background: lavenderblush;
  width: 100%;
}
.friend-name {
  margin-left: 10px;
}
</style>
