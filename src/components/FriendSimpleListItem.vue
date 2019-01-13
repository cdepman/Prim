<template>
  <div class="friend" v-on:click="selectFriend">
    ▷ {{ friend.fullName() }}
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
  width: 100%;
}
</style>
