import { v4 as uuidv4 } from 'uuid'

export const users = [
    {
        id: uuidv4(),
        email: 'sita@epam.com',
        password: '180505@Chhh',
        age: 20,
        login: 'aaddd',
        isDeleted: false
      },
      {
        id: uuidv4(),
        email: 'test@epam.com',
        password: '180505@Caaa',
        age: 21,
        login: 'aabbb',
        isDeleted: false
      },
      {
        id: uuidv4(),
        email: 'user@epam.com',
        password: '180505@Cbbb',
        age: 22,
        login: 'aaccc',
        isDeleted: false
      }
]