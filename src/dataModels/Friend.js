export default class Friend {
  constructor () {
    this.id = null
    this.name = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.metadata = {}
    this.requiredFields = ['id', 'name', 'metadata']
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

  uuid () {
    return `prim:${this.name}:${this.createdAt}`
  }

  static fromJson (json) {
    return Object.assign(new Friend(), json)
  }

  asJson () {
    return JSON.stringify(this)
  }
}
