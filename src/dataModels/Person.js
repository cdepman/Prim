export default class Person {
  constructor () {
    this.firstName = ''
    this.firstName = ''
    this.lastName = ''
    this.middleName = ''
    this.significantDates = {}
    this.interests = {}
    this.favoriteFoods = {}
    this.favoriteMediaTypes = {}
    this.favoriteActivities = {}
    this.familiarPlaces = {}
    this.familiarFaces = {}
    this.requiredFields = ['firstName', 'lastName']
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
