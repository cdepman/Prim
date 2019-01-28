export default class Friend {
  constructor () {
    this.id = null
    this.name = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.notes = []
  }

  static fromJson (json) {
    return Object.assign(new Friend(), json)
  }

  asJson () {
    return JSON.stringify(this)
  }
}
