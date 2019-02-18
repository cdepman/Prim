export default class Friend {
  constructor () {
    this.id = null
    this.name = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.notes = []
  }

  static demo () {
    return new DemoContent().demoEntries.map(Friend.fromJson)
  }

  static fromJson (json) {
    return Object.assign(new Friend(), json)
  }
}

class DemoContent {
  constructor () {
    this.demoEntries = [
      {
        id: 0,
        name: 'Amelia Earhart',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        notes: [
          {
            title: 'Planes',
            content: 'Amelia loves flying. She is unstoppable. They say she is one of the best'
          },
          {
            title: 'Spouse',
            content: 'George. Explorer. Publisher, Author, Promoter.'
          }
        ]
      },
      {
        id: 1,
        name: 'Marsha P. Johnson',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        notes: [
          {
            title: 'NYC',
            content: 'She loves Greenwich Village and has many friends in the art scene there.'
          },
          {
            title: 'Parents',
            content: 'Alberta is a housekeeper Malcolm Works at General Motors.'
          },
          {
            title: 'New Jersey',
            content: 'She was born there, and sometimes visits family.'
          },
          {
            title: 'Birthday',
            content: 'August 24, 1945'
          }
        ]
      },
      {
        id: 2,
        name: 'Ron Weasley',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        notes: [
          {
            title: 'Birthday',
            content: 'March 1, 1980'
          },
          {
            title: 'Quiddich',
            content: 'Plays and likes the Chudley Cannons.'
          },
          {
            title: 'Hogwarts',
            content: 'Went to wizarding school. Can he help me with a few projects?'
          },
          {
            title: 'Siblings',
            content: 'Bill, Charlie, Percy, twins Fred and George, and a younger sister, Ginny'
          },
          {
            title: 'Rat',
            content: 'Named Scabbers. Turned out to be Peter Pettigrew!'
          }
        ]
      }
    ]
  }
}
