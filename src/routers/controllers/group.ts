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
import logger from '../../logger'

const router:Router = express.Router()
const validator = createValidator()

// get all groups
router.get('/allGroups', async (req: Request, res: Response) => {
    let groups: Array<Group> = []
    await getAllGroups().then((res) => {
        groups = JSON.parse(res)
    })
    if (groups && groups.length !== 0) {
        res.send({
            statusCode: 200,
            message: 'SUCCESS',
            data: groups
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'There are no groups',
        })
        logger.error('There are no groups!')
    }
})

// get group by id
router.get('/group/:id', (req: Request, res: Response) => {
    const group = getGroupById(req.params.id)
    if (group) {
    res.send({
        statusCode: 200,
        message: 'SUCCESS',
        data: group
    })} else {
        res.send({
            statusCode: 400,
            message: 'This group does not exit!',
        })
        logger.error('This group does not exit!')
    }
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
router.delete('/group/:id', async (req: Request, res: Response) => {
    const group = await getGroupById(req.params.id)
    if (group) {
        removeGroup(req.params.id)
        res.send({
            statusCode: 200,
            message: 'SUCCESS'
        })
    } else {
        res.send({
            statusCode: 400,
            message: 'This group does not exit!'
        })
        logger.error('This group does not exit!')
    }
})

export default router
