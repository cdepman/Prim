<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
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
          <form @submit.prevent="addPerson" :disabled="! person">
            <div class="input-group">
              <input v-model="person" type="text" class="form-control" placeholder="Write a person's name..." autofocus>
              <span class="input-group-btn">
                <button class="btn btn-default" type="submit" :disabled="! person">Add</button>
              </span>
            </div>
          </form>

          <ul class="list-group">
            <li v-for="person in people"
              class="list-group-item"
              :class="{completed: person.completed}"
              :key="person.id">
              <label>
                <input type="checkbox" v-model="person.completed">{{ person.text }}
              </label>
              <a @click.prevent="people.splice(people.indexOf(person), 1)"
                class="delete pull-right"
                href="#">X</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
var STORAGE_FILE = 'people.json'

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      people: [],
      person: '',
      uidCount: 0
    }
  },
  watch: {
    people: {
      handler: function (people) {
        const blockstack = this.blockstack

        // encryption is now enabled by default
        return blockstack.putFile(STORAGE_FILE, JSON.stringify(people))
      },
      deep: true
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    addPerson () {
      if (!this.person.trim()) {
        return
      }
      this.people.unshift({
        id: this.uidCount++,
        text: this.person.trim(),
        completed: false
      })
      this.person = ''
    },

    fetchData () {
      const blockstack = this.blockstack
      blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
      .then((personText) => {
        var people = JSON.parse(personText || '[]')
        people.forEach(function (person, index) {
          person.id = index
        })
        this.uidCount = people.length
        this.people = people
      })
    },

    signOut () {
      this.blockstack.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

input::placeholder {
  color: grey;
}

label {
  margin-bottom: 0;
  // width: 100%;
  cursor: pointer;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
.list-group-item {
  &.completed label {
    text-decoration: line-through;
  }

  .delete {
    display: none;
  }

  &:hover .delete {
    display: inline;
    color: grey;
    &:hover {
      text-decoration: none;
      color: red;
    }
  }
}
</style>
