import { v4 } from 'uuid'
import request from 'supertest'
import app from '../main'
describe('User Controller', () => {
    const mockUserInfo = {
        id: v4(),
        age: 20,
        email: 'jerry@epam.com',
        password: '123456',
        isDeleted: false,
        login: 'fdbbb'
    }
    const email = 'sita@epam.com'
    const password = '180505@Chhh'
    const loginSubstr = 'bbb'
    const limit = 1
    let token = ''
    it('User login', () => {
        return request(app)
        .post('/login')
        .send({ email, password })
        .then((res) => {
            expect(res.statusCode).toBe(200)
            token = res.data.access_token
        })
    })
    it('Get users', () => {
        return request(app)
        .get('/allUsers')
        .set({authorization: `Bearer ${token}`})
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.data.length).toBeGreaterThan(0)
        }) 
    })
    it('Create user', () => {
        return request(app)
        .post('/createUser')
        .set({authorization: `Bearer ${token}`})
        .send(mockUserInfo)
        .then((res) => {
            expect(res.statusCode).toBe(200)
        })
    })
    it('Update user', () => {
        return request(app)
        .post('/updateUser')
        .set({authorization: `Bearer ${token}`})
        .send({...mockUserInfo, age: 25})
        .then((res) => {
            expect(res.statusCode).toBe(200)
        })
    })
    it('Get user by id', () => {
        return request(app)
        .get(`/getUser/${mockUserInfo.id}`)
        .set({authorization: `Bearer ${token}`})
        .then((res) => {
            expect(res.statusCode).toBe(200)
            expect(res.data.id).toBe(mockUserInfo.id)
        })
    })
    it('Delete user', () => {
        return request(app)
        .delete(`/removeUser/${mockUserInfo.id}`)
        .set({authorization: `Bearer ${token}`})
        .then((res) => {
            expect(res.statusCode).toBe(200)
        })
    })
    it('Get auto suggest users', () => {
        return request(app)
        .get('/autoSuggestUsers')
        .set({authorization: `Bearer ${token}`})
        .send({ loginSubstr , limit })
        .then((res) => {
            expect(res.statusCode).toBe(200)
            expect(res.data.length).toEqual(limit)
        })
    })
})
