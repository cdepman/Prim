<template>
  <li>
    {{ friend.name }}
  </li>
</template>

<script>
export default {
  props: {
    friend: Object
  }
}
</script>
