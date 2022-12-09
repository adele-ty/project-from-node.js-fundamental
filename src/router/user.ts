import express, { Request, Response, Router } from 'express'
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation'
import { createUpdateSchema } from '../schema/user'
import { User } from 'src/entity/user'

const router:Router = express.Router()
const validator = createValidator()

// create and update user
interface createSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}
router.post('/createUpdateUser', validator.body(createUpdateSchema),
    (req: ValidatedRequest<createSchema>, res: Response) => {
    res.send("create and update user!")
})

// remove a user
router.delete('/removeUser/:id', (req: Request, res: Response) => {
    res.send('remove a user!')
})

// get user by id
router.get('/getUser/:id', (req: Request, res: Response) => {
    res.send('get a user by id!')
})

// get users
router.get('/users', (req: Request, res: Response) => {
    res.send('get all users!')
})

export default router