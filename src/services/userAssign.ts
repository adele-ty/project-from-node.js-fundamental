import db from '../models'
import { UserAssignment } from '../entity/userAssignment'
import sequelize from '../../config/db'

const addUsersToGroup = async (userAssign: UserAssignment) => {
    userAssign.UserIds.forEach(async (userId) => {
        await db.UserAssignment.create({GroupId: userAssign.GroupId, UserId: userId})
    })
}

export { addUsersToGroup }
