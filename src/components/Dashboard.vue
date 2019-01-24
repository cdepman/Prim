<template>
  <v-app>
    <v-content>
      <page-header v-bind:user="user"></page-header>
      <v-container fluid>
        <q-r-show v-on:hideQR="showQR = false" v-bind="{ qrContents, showQR }"></q-r-show>
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
          v-on:hideAddFriendDialog="showAddFriendDialog = false"
        >
        </add-friend-dialog>
        <friend-detail-dialog
          v-if="selectedFriend"
          v-bind="{ selectedFriend, showFriendDetailDialog }"
          v-on:updateFriend="updateFriend"
          v-on:hideAddFriendDialog="showFriendDetailDialog = false"
        >
        </friend-detail-dialog>
        <searchable-list
          v-bind="{ items: friends }"
          v-on:selectItem="selectFriend"
        >
        </searchable-list>
      </v-container>
    </v-content>
    <navigation-float
      v-on:showAddFriendDialog="showAddFriendDialog = true"
      v-on:showQR="showQR = true"
      v-on:scanQR="this.scanQR"
      v-on:showSignOutDialog="showSignOutDialog = true"
    ></navigation-float>
  </v-app>
</template>

<script>
import Friend from '../dataModels/Friend.js'
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
  SignOutDialog
}

export default {
  name: 'dashboard',
  components: components,
  props: {
    user: Object
  },
  data () {
    return {
      showAddFriendDialog: false,
      showFriendDetailDialog: false,
      showSignOutDialog: false,
      friends: [],
      showQR: false,
      selectedFriend: null,
      person: {}
    }
  },
  computed: {
    qrContents: function () {
      return JSON.stringify(this.friends)
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
    this.fetchData()
  },
  methods: {
    scanQR () {
      document.getElementById('qr_upload').click()
    },
    selectFriend (selectedFriend) {
      this.selectedFriend = selectedFriend
      this.showFriendDetailDialog = true
    },
    createPerson () {
      this.person.id = this.getNextPersonId()
      this.person.createdAt = this.person.updatedAt = Date.now()
      return Object.assign(new Friend(), this.person)
    },
    updateFriend (updatedFriend) {
      const numItemsToReplace = 1
      this.friends.forEach((storedFriend, index) => {
        if (updatedFriend.id === storedFriend.id) {
          this.friends.splice(index, numItemsToReplace, updatedFriend)
        }
      }, this)
    },
    addPerson (person) {
      console.log('ADD PERSON: ', person)
      return
      // let friendToAdd = this.createPerson()
      // if (!friendToAdd.isComplete()) return
      // this.friends.unshift(friendToAdd)
      // this.person = {}
      // this.closeDialog()
    },
    getNextPersonId () {
      if (this.friends.length === 0) return 0
      let max = Math.max(...this.friends.map((person) => person.id)) || 0
      return max + 1
    },
    fetchData () {
      FriendStorageService.fetchJSON()
      .then((peopleJSONBlob) => {
        let friends = JSON.parse(peopleJSONBlob || '[]')
        if (friends.length) {
          let inflatedPeople = friends.map((p) => Friend.fromJson(p))
          this.friends = inflatedPeople
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
