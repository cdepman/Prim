<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <page-header v-bind:user="user"></page-header>
        <q-r-show v-on:hideQR="showQR = false" v-bind="{ qrContents, showQR }"></q-r-show>
        <q-r-read></q-r-read>
        <web-r-t-c></web-r-t-c>
        <add-friend-dialog
          v-bind="{ person, showAddFriendDialog }"
          v-on:addPerson="addPerson"
          v-on:hideAddFriendDialog="showAddFriendDialog = false"
        >
        </add-friend-dialog>
        <friend-detail-dialog
          v-bind="{ selectedFriend, showFriendDetailDialog }"
          v-on:updateFriend="updateFriend"
          v-on:hideAddFriendDialog="showFriendDetailDialog = false"
        >
        </friend-detail-dialog>
        <searchable-list
          v-bind="{ items }"
          v-on:selectItem="selectFriend"
        >
        </searchable-list>
      </v-container>
    </v-content>
    <navigation
      v-on:showAddFriendDialog="showAddFriendDialog = true"
      v-on:showQR="showQR = true"
      v-on:scanQR="this.scanQR"
    ></navigation>
  </v-app>
</template>

<script>
import Person from '../dataModels/Person.js'
import PageHeader from './PageHeader.vue'
import FriendStorageService from '../services/FriendStorage.js'
import QRShow from './QRShow.vue'
import QRRead from './QRRead.vue'
import WebRTC from './WebRTC.vue'
import AddFriendDialog from './AddFriendDialog.vue'
import FriendDetailDialog from './FriendDetailDialog.vue'
import SearchableList from './SearchableList.vue'
import Navigation from './Navigation.vue'

const components = {
  PageHeader,
  QRShow,
  QRRead,
  WebRTC,
  AddFriendDialog,
  Navigation,
  FriendDetailDialog,
  SearchableList
}

export default {
  name: 'dashboard',
  props: {
    user: Object
  },
  data () {
    return {
      showAddFriendDialog: false,
      showFriendDetailDialog: false,
      editedIndex: -1,
      search: '',
      people: [],
      showQR: false,
      selectedFriend: null,
      person: {},
      headers: [
        {
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
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    scanQR: function () {
      console.log('scanQr')
      document.getElementById('qr_upload').click()
    },
    handleCreate () {
      console.log('Child has been created.')
    },
    selectFriend (selectedFriend) {
      console.log(selectedFriend)
      this.selectedFriend = selectedFriend
      this.showFriendDetailDialog = true
    },
    handleFriendDeselected () {
      console.log('Child has been deselected.')
      this.selectedFriend = null
    },
    getPerson () {
      this.person.id = this.getNextPersonId()
      this.person.createdAt = Date.now()
      return Object.assign(new Person(), this.person)
    },
    updateFriend (friend) {

    },
    openDialog () {
      this.showAddFriendDialog = true
    },
    closeDialog () {
      this.showAddFriendDialog = false
    },
    addPerson (person) {
      console.log('ADD PERSON: ', person)
      return
      // let personToAdd = this.getPerson()
      // if (!personToAdd.isComplete()) return
      // this.people.unshift(personToAdd)
      // this.person = {}
      // this.closeDialog()
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

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-bottom: -22px;
}

.edit-icon:hover {
  color: black;
}

.upload-btn-wrapper input[type=file] {
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
