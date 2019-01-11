export default class Person {
  constructor () {
    this.firstName = ''
    this.firstName = ''
    this.lastName = ''
    this.middleName = ''
    this.interests = {}
    this.favoriteFoods = {}
    this.favoriteMediaTypes = {}
    this.favoriteActivities = {}
    this.familiarPlaces = {}
    this.familiarFaces = {}
    this.requiredStrings = ['firstName', 'lastName']
  }

  fullName () {
    return [
      this.firstName,
      this.middleName,
      this.lastName
    ].filter(Boolean).join(' ')
  }

  isComplete () {
    let that = this
    return this.requiredStrings.every((field) => {
      if (that[field].length === 0) {
        return false
      }
      return true
    })
  }

  static fromJson (json) {
    return Object.assign(new Person(), json)
  }

  asJson () {
    return JSON.stringify(this)
  }
}
