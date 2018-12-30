<template>
  <li class="hello">
    {{ friend.text }}
  </li>
</template>

<script>
export default {
  props: {
    friend: Object
  }
}
</script>
