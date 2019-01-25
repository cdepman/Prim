import Friend from '../dataModels/Friend.js'

export default class CreateFriend {
  static run ({ id, attributes }) {
    const friendParams = {
      ...attributes,
      id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    return Object.assign(new Friend(), friendParams)
  }
}
