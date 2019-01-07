<template>
  <div class="friend" v-on:click="selectFriend">
    {{ friend.name.toUpperCase() }}
  </div>
</template>

<script>
export default {
  props: {
    friend: Object
  },
  methods: {
    selectFriend: function (event) {
      console.log('HELLO FROM THE OUTSIDE')
    }
  }
}
</script>

<style scoped>
.friend {
  cursor: pointer;
}
.friend:hover {
  background-color: aliceblue;
}
</style>
