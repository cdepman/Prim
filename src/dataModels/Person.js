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
    this.requiredStrings.each((field) => {
      if (this[field].length === 0) {
        return false
      }
      return true
    })
  }

  asJson () {
    return JSON.stringify(this)
  }
}
