import express, { Request, Response, Router } from 'express'
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation'
import { groupSchema } from '../../schema/group'
import { Group } from '../../entity/group'
import {
    getGroupById,
    getAllGroups,
    createAndUpdate,
    removeGroup
} from '../../services/group'

const router:Router = express.Router()
const validator = createValidator()

// get all groups
router.get('/allGroups', async (req: Request, res: Response) => {
    const groups = await getAllGroups()
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: JSON.parse(groups)
    })
})

// get group by id
router.get('/group/:id', (req: Request, res: Response) => {
    const group = getGroupById(req.params.id)
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: group
    })
})

// create and update group
interface createUpdateInfo extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Group
}
router.post('/createUpdate', validator.body(groupSchema),
(req: ValidatedRequest<createUpdateInfo>, res: Response) => {
    createAndUpdate(req.body)
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

// remove a group
router.delete('/group/:id', (req: Request, res: Response) => {
    getAllGroups().then((GroupList) => {
        let group = JSON.parse(GroupList).find((item: Group) => item.id === req.params.id)
        if (group) {
            removeGroup(req.params.id)
        } else {
            throw new Error('The group does not exit!')
        }
    })
    res.send({
        statusCode: 200,
        message: 'SUCCESS'
    })
})

export default router
