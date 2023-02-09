import db from '../models'
import { Group } from '../entity/group'

const getGroupById = async (id: string) => {
    const group = await db.Group.findOne({
        where: { id }
    });
    return JSON.stringify(group)
}

const getAllGroups = async () => {
    const allGroups = await db.Group.findAll()
    return JSON.stringify(allGroups)
}

const createAndUpdate = async (group: Group) => {
    const [exitGroup, created] = await db.Group.findOrCreate({
        where: { id: group.id },
        defaults: group
    });
    if (!created) {
        await db.Group.update(group, {
        where: {
            id: group.id
        }
      });
    }
}

const removeGroup = async (id: string) => {
    const group = await db.Group.findOne({
        where: { id }
    });
    await group.getUsers().then((res: any) => {
        group.removeUsers(res)
    })
    await db.Group.destroy({
        where: { id }
    });
}

export {
    getGroupById,
    getAllGroups,
    createAndUpdate,
    removeGroup
}
