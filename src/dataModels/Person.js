export default class Person {
  constructor () {
    this.id = null
    this.firstName = ''
    this.lastName = ''
    this.middleName = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.age = null
    this.places = {}
    this.dates = {}
    this.interests = {}
    this.foods = {}
    this.media = {}
    this.activities = {}
    this.people = {}
    this.requiredFields = ['id', 'firstName', 'lastName']
  }

  fullName () {
    return [
      this.firstName,
      this.middleName,
      this.lastName
    ].filter(Boolean).join(' ')
  }

  isComplete () {
    return this.requiredFields.every((field) => {
      const value = this[field]
      if (typeof value === 'string' && value.length === 0) {
        return false
      }
      if (typeof value === 'object' && Object.keys(value).length === 0) {
        return false
      }
      if (Array.isArray(value) && value.length === 0) {
        return false
      }
      return true
    }, this)
  }

  static fromJson (json) {
    return Object.assign(new Person(), json)
  }

  asJson () {
    return JSON.stringify(this)
  }
}
