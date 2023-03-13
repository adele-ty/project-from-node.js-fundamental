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
import logger from '../../logger'

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
            if (result)
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
        else {
            res.send({
                statusCode: 400,
                message: 'LOGIN FAIL'
            })
            logger.error('Login failed', req.method, req.params)
        }
})

// create and update user
interface createSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}

router.post('/createUser', validator.body(createUpdateSchema),
    async (req: ValidatedRequest<createSchema>, res: Response) => {
    createUser(req.body)
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

router.post('/updateUser', validator.body(createUpdateSchema),
    async (req: ValidatedRequest<createSchema>, res: Response) => {
    updateUser(req.body)
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// get all users
router.get('/allUsers', async (req: Request, res: Response) => {
    let users:Array<User> = []
    await getAllUsers().then(res => users = JSON.parse(res))
    if (users && users.length > 0) {
        res.send({
            statusCode: 200,
            message: 'SUCCESS',
            data: users
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'There are no users!'
        })
        logger.warn('There are no users!', req.method, req.params)
    }
})

// remove a user
router.delete('/removeUser/:id', async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id)
    if (user) {
        removeUser(req.params.id)
        res.send({
            statusCode: 200,
            message: 'SUCCESS'
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'The user does not exit!'
        })
        logger.warn('The user does not exit! ', req.method, req.params)
    }
})

// get user by id
router.get('/getUser/:id', async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id)
    if (user) {
        res.send({
            statusCode: 200,
            message: 'SUCCESS',
            data: JSON.parse(user)
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'The user does not exit!'
        })
        logger.error('The user does not exit!', req.method, req.params)
    }
})

// get auto suggest users
router.get('/autoSuggestUsers', async (req: Request, res: Response) => {
    const { loginSubstr , limit } = req.query
    let users: Array<User> = []
    await getAutoSuggest(loginSubstr as string, limit as string).then(res => users = JSON.parse(res))
    if (users && users.length > 0) {
        res.send({
            statusCode: 200,
            message: 'SUCCESS',
            data: users
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'No users to suggest!'
        })
        logger.warn('No users to suggest!', req.method, req.params)
    }
})

export default router
