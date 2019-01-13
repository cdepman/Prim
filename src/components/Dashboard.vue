<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <page-header v-bind:user="user">
          </page-header>
          <div class="input-group">
            <input v-on:keyup.enter="addPerson"
                   v-model="person.firstName"
                   type="text"
                   class="form-control"
                   placeholder="First Name"
                   autofocus>
            <input v-on:keyup.enter="addPerson"
                   v-model="person.lastName"
                   type="text"
                   class="form-control"
                   placeholder="Last Name"
                   autofocus>
          </div>
          <span class="input-group-btn">
            <button v-if="person.firstName"
                    class="btn btn-default"
                    v-on:click="addPerson"
                    :disabled="! person">
                    Add {{ person.firstName }} to your dossier
            </button>
          </span>
          <draggable v-model="people" class="list-group">
            <div v-for="person in people"
                 class="list-group-item"
                 v-bind:friend="person"
                 :key="person.id">
              <friend-detail
                v-if="selectedId === person.id"
                v-bind:friend="person"
                @friendDeselected="handleFriendDeselected">
              </friend-detail>
              <friend
                v-else
                v-bind:friend="person"
                @created="handleCreate"
                @friendSelected="handleFriendSelected">
              </friend>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import Person from '../dataModels/Person.js'
import FriendSimpleListItem from './FriendSimpleListItem.vue'
import FriendDetailListItem from './FriendDetailListItem.vue'
import PageHeader from './PageHeader.vue'
import FriendStorageService from '../services/FriendStorage.js'

const components = {
  friend: FriendSimpleListItem,
  pageHeader: PageHeader,
  friendDetail: FriendDetailListItem,
  draggable
}

export default {
  name: 'dashboard',
  props: {
    user: Object
  },
  data () {
    return {
      people: [],
      selectedId: null,
      person: {}
    }
  },
  components: components,
  watch: {
    people: {
      handler: function (people) {
        FriendStorageService.storeJSON(JSON.stringify(people))
      },
      deep: true
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleCreate () {
      console.log('Child has been created.')
    },
    handleFriendSelected (selectedFriendId) {
      this.selectedId = selectedFriendId
    },
    handleFriendDeselected () {
      console.log('Child has been deselected.')
      this.selectedId = null
    },
    getPerson () {
      this.person.id = this.getNextPersonId()
      return Object.assign(new Person(), this.person)
    },
    addPerson () {
      let personToAdd = this.getPerson()
      if (!personToAdd.isComplete()) return
      this.people.unshift(personToAdd)
      this.person = {}
    },
    getNextPersonId () {
      if (this.people.length === 0) return 0
      let max = Math.max(...this.people.map((person) => person.id)) || 0
      return max + 1
    },
    fetchData () {
      FriendStorageService.fetchJSON()
      .then((peopleJSONBlob) => {
        let people = JSON.parse(peopleJSONBlob || '[]')
        if (people.length) {
          let inflatedPeople = people.map((p) => Person.fromJson(p))
          this.people = inflatedPeople
        }
      })
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
  cursor: pointer;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;

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
