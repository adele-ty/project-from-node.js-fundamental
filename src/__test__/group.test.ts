import { v4 } from 'uuid'
import request from 'supertest'
import app from '../main'

describe('Group', () => {
    const email = 'sita@epam.com'
    const password = '180505@Chhh'
    let token = ''
    const mockGroupInfo = {
        id: v4(),
        name: 'group2',
        permissions: ['WRITE', 'READ']
    }
    it('User login', () => {
        return request(app)
        .post('/login')
        .send({ email, password })
        .then((res) => {
            expect(res.statusCode).toBe(200)
            token = res.data.access_token
        })
    })
    it('Get all groups', () => {
        return request(app)
        .get('/allGroups')
        .set({authorization: `Bearer ${token}`})
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.data.length).toBeGreaterThan(0)
        }) 
    })
    it('Create and update group', () => {
        return request(app)
        .post('/createUpdate')
        .set({authorization: `Bearer ${token}`})
        .send(mockGroupInfo)
        .then(res => {
            expect(res.statusCode).toBe(200)
        })
    })
    it('Get group by id', () => {
        return request(app)
        .get(`/group/${mockGroupInfo.id}`)
        .set({authorization: `Bearer ${token}`})
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.data.id).toBe(mockGroupInfo.id)
        })
    })
    it('Delete group', () => {
        return request(app)
        .delete(`/group/${mockGroupInfo.id}`)
        .set({authorization: `Bearer ${token}`})
        .then(res => {
            expect(res.statusCode).toBe(200)
        })
    })
})