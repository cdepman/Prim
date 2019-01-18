<template>
  <v-content>
    <v-container fluid>
      <page-header v-bind:user="user"></page-header>
      <qr-show v-on:hideQR="this.hideQR" v-bind="{ qrContents, showQR }"></qr-show>
      <qr-read></qr-read>
      <webrtc></webrtc>
      <v-card dark data-app>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          hide-details
          class="search"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="people"
          :search="search"
          sort-icon="mdi-sort-alphabetical"
          hide-actions
        >
          <template slot="headers" slot-scope="props">

          </template>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.fullName() }}</td>
            <td class="text-xs-right">
              <i class="fas fa-pencil-alt edit-icon"></i>
            </td>
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
    </v-container>
  </v-content>
</template>

<script>
import Person from '../dataModels/Person.js'
import FriendSimpleListItem from './FriendSimpleListItem.vue'
import FriendDetailListItem from './FriendDetailListItem.vue'
import PageHeader from './PageHeader.vue'
import FriendStorageService from '../services/FriendStorage.js'
import QRShow from './QRShow.vue'
import QRRead from './QRRead.vue'
import WebRTC from './WebRTC.vue'

const components = {
  friend: FriendSimpleListItem,
  pageHeader: PageHeader,
  friendDetail: FriendDetailListItem,
  qrShow: QRShow,
  qrRead: QRRead,
  webrtc: WebRTC
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
      showQR: false,
      selectedId: null,
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
    },
    dialog (val) {
      val || this.closeDialog()
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
    hideQR () {
      this.showQR = false
    },
    triggerQrShow () {
      this.showQR = true
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
