<template>
  <div>
    <h1 class="page-header">Pungyo PRM
      <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
      <small><span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span></small>
    </h1>
    <h2 class="user-info">
      <small>
        {{ user.name() ? user.name() : 'Anonymous Person' }}'s People
      </small>
      <small class="pull-right">
      {{ user.username ? user.username : user.identityAddress }}
      </small>
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
