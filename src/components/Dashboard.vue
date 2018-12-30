<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <page-header v-bind:user="user">
          </page-header>
          <div class="input-group">
            <input v-on:keyup.enter="addPerson" 
                   v-model="person" 
                   type="text" 
                   class="form-control" 
                   placeholder="Enter a friend's name..." 
                   autofocus>
          </div>
          <span class="input-group-btn">
            <button v-if="person.length" 
                    class="btn btn-default" 
                    v-on:click="addPerson" 
                    :disabled="! person">
                    Add {{ person }} to your dossier
            </button>
          </span>
          <ul class="list-group">
            <friend v-for="person in people" 
                    class="list-group-item" 
                    :key="person.id" 
                    v-bind:friend="person">
            </friend>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Friend from './Friend.vue'
import PageHeader from './PageHeader.vue'
const FRIEND_STORAGE_FILE = 'people.json'

export default {
  name: 'dashboard',
  props: {
    user: Object
  },
  data () {
    return {
      blockstack: window.blockstack,
      people: [],
      person: '',
      uidCount: 0
    }
  },
  components: {
    friend: Friend,
    pageHeader: PageHeader
  },
  watch: {
    people: {
      handler: function (people) {
        const blockstack = this.blockstack

        // encryption is now enabled by default
        return blockstack.putFile(FRIEND_STORAGE_FILE, JSON.stringify(people))
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
        name: this.person.trim()
      })
      this.person = ''
    },
    fetchData () {
      const blockstack = this.blockstack
      blockstack.getFile(FRIEND_STORAGE_FILE) // decryption is enabled by default
      .then((peopleJSONBlob) => {
        var people = JSON.parse(peopleJSONBlob || '[]')
        people.forEach(function (person, index) {
          person.id = index
        })
        this.uidCount = people.length
        this.people = people
      })
    },
    editPerson () {

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
.input-group {
  width: 100%;
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
