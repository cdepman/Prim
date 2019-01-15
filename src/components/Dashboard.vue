<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <page-header v-bind:user="user"></page-header>
      <qr v-bind:qrContents="qrContents"></qr>
      <v-card dark data-app>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          hide-details
          class="search"
        ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
          dark
        >
          <v-btn
            slot="activator"
            color="primary"
            dark
            class="mb-2"
          >
            New Person
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">
                {{ formTitle }}
              </span>
            </v-card-title>

            <v-card-text>
              <v-layout justify-center column fill-height>
                  <v-text-field
                    v-model="person.firstName"
                    label="First Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="person.lastName"
                    label="Last Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="person.fat"
                    label="Birthdate"
                  ></v-text-field>
                  <v-text-field
                    v-model="person.carbs"
                    label="Middle Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="person.protein"
                    label="Meeting Context"
                  ></v-text-field>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                flat
                @click="closeDialog"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                flat
                @click="addPerson"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="people"
          :search="search"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.fullName() }}</td>
            <td class="text-xs-right">{{ props.item.age }}</td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
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
import QR from '../components/QR.vue'

const components = {
  friend: FriendSimpleListItem,
  pageHeader: PageHeader,
  friendDetail: FriendDetailListItem,
  qr: QR,
  draggable
}

export default {
  name: 'dashboard',
  props: {
    user: Object
  },
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      search: '',
      people: [],
      selectedId: null,
      person: {},
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'firstName'
        },
        { value: 'lastName' }
      ]
    }
  },
  computed: {
    formTitle: function () {
      return this.editedIndex === -1 ? 'New Entry' : 'Edit Entry'
    },
    qrContents: function () {
      return JSON.stringify(this.people)
    }
  },
  components: components,
  watch: {
    people: {
      handler: function (people) {
        FriendStorageService.storeJSON(JSON.stringify(people))
      },
      deep: true
    },
    dialog (val) {
      val || this.closeDialog()
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
      this.person.dateAdded = new Date()
      return Object.assign(new Person(), this.person)
    },
    closeDialog () {
      this.dialog = false
    },
    addPerson () {
      let personToAdd = this.getPerson()
      if (!personToAdd.isComplete()) return
      this.people.unshift(personToAdd)
      this.person = {}
      this.closeDialog()
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

.search {
  margin: 10px;
  padding-top: 18px;
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
