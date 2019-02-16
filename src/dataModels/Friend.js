export default class Friend {
  constructor () {
    this.id = null
    this.name = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.notes = []
  }

  static demo () {
    return [
      Object.assign(
        new Friend(),
        {
          id: 0,
          name: 'Amelia Earhart',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          notes: [
            {
              title: 'Planes',
              content: 'Amelia loves flying. She is unstoppable. They say she is one of the best'
            }
          ]
        }
      ),
      Object.assign(
        new Friend(),
        {
          id: 0,
          name: 'Marsha P. Johnson',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          notes: [
            {
              title: 'NYC',
              content: 'She loves Greenwich Village and has many friends in the art scene there.'
            },
            {
              title: 'Siblings',
              content: 'She has 6 siblings. Do any of them live nearby?'
            },
            {
              title: 'New Jersey',
              content: 'She was born there, and sometimes visits family.'
            }
          ]
        }
      )
    ]
  }

  static fromJson (json) {
    return Object.assign(new Friend(), json)
  }
}
