<template>
  <div class="friend-detail" v-on:click="deselectFriend">
    <div class="friend friend-name">
      ▶︎ {{ friend.fullName() }}
    </div>
    <div>
      age: {{ friend.age }}
    </div>
    <div v-for="item in friend.interests" :key="item.id">
      <div> {{ item.description }} </div>
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
  width: 100%;
  margin-left: 1px;
}
.edit {
  align-self: flex-end;
}
</style>
