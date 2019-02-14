<template>
  <v-app>
    <v-content>
      <loading-animation v-bind="{ showLoading }">
      </loading-animation>
      <page-header
        v-bind:user="user"
        v-on:editProfile="editProfile"
      >
      </page-header>
      <v-container fluid>
        <q-r-show
          v-on:hideQR="showQR = false"
          v-on:editProfile="editProfile"
          v-bind="{ qrContents, showQR }">
        </q-r-show>
        <q-r-read></q-r-read>
        <web-r-t-c></web-r-t-c>
        <sign-out-dialog
          v-bind="{ showSignOutDialog }"
          v-on:hideSignOutDialog="showSignOutDialog = false"
        >
        </sign-out-dialog>
        <add-friend-dialog
          v-bind="{ person, showAddFriendDialog }"
          v-on:addPerson="addPerson"
          v-on:scanQR="scanQR"
          v-on:hideAddFriendDialog="showAddFriendDialog = false"
        >
        </add-friend-dialog>
        <friend-detail-dialog
          v-if="selectedFriend"
          v-bind="{ selectedFriend, showFriendDetailDialog }"
          v-on:updateFriend="updateFriend"
          v-on:hideAddFriendDialog="showFriendDetailDialog = false"
          v-on:showNoteDetail="noteDetail"
          v-on:addNote="addNote"
        >
        </friend-detail-dialog>
        <searchable-list
          v-bind="{ items: filteredFriends }"
          v-on:selectItem="selectFriend"
        >
        </searchable-list>
      </v-container>
    </v-content>
    <div id="footer">
      <search-bar v-on:search="search">
      </search-bar>
      <navigation-float
        v-on:showAddFriendDialog="showAddFriendDialog = true"
        v-on:showQR="showQR = true"
        v-on:showSignOutDialog="showSignOutDialog = true"
      ></navigation-float>
    </div>
  </v-app>
</template>

<script>
import Friend from '../dataModels/Friend.js'
import CreateFriend from '../interactors/CreateFriend.js'
import PageHeader from './PageHeader.vue'
import FriendStorageService from '../services/FriendStorage.js'
import QRShow from './QRShow.vue'
import QRRead from './QRRead.vue'
import WebRTC from './WebRTC.vue'
import AddFriendDialog from './AddFriendDialog.vue'
import FriendDetailDialog from './FriendDetailDialog.vue'
import SearchableList from './SearchableList.vue'
import Navigation from './Navigation.vue'
import NavigationFloat from './NavigationFloat.vue'
import SignOutDialog from './SignOutDialog.vue'
import LoadingAnimation from './LoadingAnimation.vue'
import SearchBar from './SearchBar.vue'

import Fuse from 'fuse.js'

const components = {
  PageHeader,
  QRShow,
  QRRead,
  WebRTC,
  AddFriendDialog,
  Navigation,
  FriendDetailDialog,
  SearchableList,
  NavigationFloat,
  SignOutDialog,
  LoadingAnimation,
  SearchBar
}

export default {
  name: 'dashboard',
  components: components,
  props: {
    user: Object
  },
  data () {
    return {
      showLoading: true,
      showAddFriendDialog: false,
      showFriendDetailDialog: false,
      showSignOutDialog: false,
      showNoteDetail: false,
      friends: [],
      showQR: false,
      selectedFriend: null,
      selectedNote: null,
      person: {
        notes: [
          {
            title: '',
            content: ''
          }
        ]
      },
      searchTerm: ''
    }
  },
  computed: {
    qrContents () {
      return JSON.stringify(this.friends)
    },
    filteredFriends () {
      if (!this.searchTerm) return this.friends

      const options = {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 0,
        keys: [ 'name' ]
      }
      const fuse = new Fuse(this.friends, options)
      return fuse.search(this.searchTerm)
    }
  },
  watch: {
    friends: {
      handler: function (friends) {
        FriendStorageService.storeJSON(JSON.stringify(friends))
      },
      deep: true
    }
  },
  mounted () {
    console.log('fetchData')
    this.fetchData()
  },
  methods: {
    search (term) {
      this.searchTerm = term
    },
    noteDetail (note) {
      console.log(note)
      this.selectedNote = note
      this.showNoteDetail = true
    },
    scanQR () {
      document.getElementById('qr_upload').click()
    },
    selectFriend (selectedFriend) {
      this.selectedFriend = selectedFriend
      this.showFriendDetailDialog = true
    },
    updateFriend (updatedFriend) {
      const numItemsToReplace = 1
      this.friends.forEach((storedFriend, index) => {
        if (updatedFriend.id === storedFriend.id) {
          this.friends.splice(index, numItemsToReplace, updatedFriend)
        }
      }, this)
    },
    startLoading () {
      this.showLoading = true
    },
    endLoading () {
      this.showLoading = false
    },
    addNote ({ selectedFriend, note }) {
      console.log(selectedFriend, note)
      const friend = this.friends.find((friend) => friend === selectedFriend)
      friend.notes.push(note)
    },
    addPerson (person) {
      const friendToAdd = CreateFriend.run({
        id: this.getNextPersonId(),
        attributes: this.person
      })
      this.friends.unshift(friendToAdd)
      this.person = {}
    },
    getNextPersonId () {
      if (this.friends.length === 0) return 0
      let max = Math.max(...this.friends.map((person) => person.id)) || 0
      return max + 1
    },
    editProfile () {
      console.log('edit profile!')
    },
    fetchData () {
      this.startLoading()
      FriendStorageService.fetchJSON()
      .then((peopleJSONBlob) => {
        let friends = JSON.parse(peopleJSONBlob || '[]')
        if (friends.length) {
          let inflatedPeople = friends.map((p) => Friend.fromJson(p))
          this.friends = inflatedPeople
          this.endLoading()
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

#footer {
  padding-right: 105px;
  padding-bottom: 30px;
  padding-left: 25px;
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
