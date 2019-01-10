<template>
  <div class="friend" v-on:click="selectFriend">
    {{ friend.name }}
  </div>
</template>

<script>

export default {
  props: {
    friend: Object
  },
  created () {
    this.$emit('created')
  },
  methods: {
    selectFriend: function (event) {
      this.$emit('friendSelected', this.friend.id)
    }
  }
}
</script>

<style scoped>
.friend {
  margin-left: 10px;
  width: 100%;
}
.friend:hover {
  background-color: aliceblue;
}
</style>
