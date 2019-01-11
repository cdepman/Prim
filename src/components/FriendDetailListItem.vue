<template>
  <div class="friend-detail" v-on:click="deselectFriend">
    <div class="friend friend-name">
      {{ friend.fullName().toUpperCase() }}
    </div>
    <div class="friend">
      age: {{ friend.age }}
    </div>
    <button class="edit">
      edit
    </button>
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
.edit {
  align-self: flex-end;
}
.friend {
  margin-left: 10px;
}
</style>
