const FRIEND_STORAGE_FILE = 'people1.json'

export default class FriendStorageService {
  static storeJSON (jsonBlob) {
    return window.blockstack.putFile(FRIEND_STORAGE_FILE, jsonBlob)
  }

  static fetchJSON () {
    return window.blockstack.getFile(FRIEND_STORAGE_FILE)
  }
}
