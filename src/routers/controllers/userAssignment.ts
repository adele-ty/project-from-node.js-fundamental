import express, { Request, Response, Router } from 'express'
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation'
import { userAssigSchema } from '../../schema/userAssign'
import { UserAssignment } from '../../entity/userAssignment'
import { addUsersToGroup } from '../../services/userAssign'

const router:Router = express.Router()
const validator = createValidator()

interface addSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: UserAssignment
}

router.post('/addUsersToGroup', validator.body(userAssigSchema), (req: ValidatedRequest<addSchema>, res: Response) => {
    addUsersToGroup(req.body)
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

export default router
