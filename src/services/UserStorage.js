const USER_STORAGE_FILE = 'user1.json'

export default class UserStorageService {
  static storeJSON (jsonBlob) {
    return window.blockstack.putFile(USER_STORAGE_FILE, jsonBlob)
  }

  static fetchJSON () {
    return window.blockstack.getFile(USER_STORAGE_FILE)
  }
}
