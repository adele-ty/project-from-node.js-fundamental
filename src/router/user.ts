import express, { Request, Response, Router } from 'express'
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation'
import { createUpdateSchema, loginInfoSchema } from '../schema/user'
import { User, LoginInfo } from '../entity/user'
import { isObjectValueEqual } from '../utils/isObjectEqual'
import jwt from 'jsonwebtoken';
import UsersList from '../mockData/userList'

const router:Router = express.Router()
const validator = createValidator()

// login
interface loginSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: LoginInfo
}
router.post('/login', validator.body(loginInfoSchema),
    (req: ValidatedRequest<loginSchema>, res: Response) => {
        const { email, password } = req.body
        const user = UsersList.find(item => item.email === email)
        console.log(process.env)
        if (user) {
            if (user.password === password) {
                const token = jwt.sign({...user, password: ''}, process.env.JWTSecret, { expiresIn: process.env.Expires })
                res.send({
                    statusCode: 200,
                    message: 'LOGIN SUCCESS',
                    data: {
                        access_token: 'Bearer ' + token,
                    },
                })
            }
            else res.send({
                statusCode: 400,
                message: 'LOGIN FAIL'
            })
        } else {
            res.send({
                statusCode: 400,
                message: 'The user does not exist'
            })
        }
})

// create and update user
interface createSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}

router.post('/createUpdateUser', validator.body(createUpdateSchema),
    (req: ValidatedRequest<createSchema>, res: Response) => {
    let user = UsersList.find(item => item.id === req.body.id)
    if (user) {
        for (let i = 0; i < UsersList.length; i++) {
            if (isObjectValueEqual(UsersList[i], user))
                return UsersList.splice(i, 1)
        }   
    }
    UsersList.push({...req.body})
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// remove a user
router.delete('/removeUser/:id', (req: Request, res: Response) => {
    const user = UsersList.find(item => item.id === req.params.id)
    user.isDeleted = true
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// get user by id
router.get('/getUser/:id', (req: Request, res: Response) => {
    const user = UsersList.find(item => item.id === req.params.id)
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: user
    })
})

// get auto suggest users
router.get('/autoSuggestUsers', (req: Request, res: Response) => {
    res.send('get auto suggest users!')
})

export default router