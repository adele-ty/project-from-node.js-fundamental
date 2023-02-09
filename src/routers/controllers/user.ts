import express, { Request, Response, Router } from 'express'
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation'
import { createUpdateSchema, loginInfoSchema } from '../../schema/user'
import { User, LoginInfo } from '../../entity/user'
import { 
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    getAutoSuggest
} from '../../services/user'
import { login } from '../../services/login'

const router:Router = express.Router()
const validator = createValidator()

// login
interface loginSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: LoginInfo
}
router.post('/login', validator.body(loginInfoSchema),
    async (req: ValidatedRequest<loginSchema>, res: Response) => {
        const { email, password } = req.body
        let token = ''
        await login(email, password).then((result) => {
            token = result
        })
        if (token) {
            res.send({
                statusCode: 200,
                message: 'LOGIN SUCCESS',
                data: {
                    access_token: token,
                },
            })
        }
        else res.send({
            statusCode: 400,
            message: 'LOGIN FAIL'
        })
})

// create and update user
interface createSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}

router.post('/createUpdateUser', validator.body(createUpdateSchema),
    async (req: ValidatedRequest<createSchema>, res: Response) => {
    await getAllUsers().then((UsersList) => {
        let user = JSON.parse(UsersList).find((item: User) => item.id === req.body.id)
        if (user) {
            updateUser(req.body)
        } else {
            createUser(req.body)
        }
    })
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// get all users
router.get('/allUsers', async (req: Request, res: Response) => {
    const users = await getAllUsers()
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: JSON.parse(users)
    })
})

// remove a user
router.delete('/removeUser/:id', async (req: Request, res: Response) => {
    await getAllUsers().then((UsersList) => {
        let user = JSON.parse(UsersList).find((item: User) => item.id === req.params.id)
        if (user) {
            removeUser(req.params.id)
        } else {
            throw new Error('The user does not exit!')
        }
    })
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// get user by id
router.get('/getUser/:id', async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id)
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: JSON.parse(user)
    })
})

// get auto suggest users
router.get('/autoSuggestUsers', async (req: Request, res: Response) => {
    const { loginSubstr , limit } = req.query
    const users = await getAutoSuggest(loginSubstr as string, limit as string)
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: JSON.parse(users)
    })
})

export default router
