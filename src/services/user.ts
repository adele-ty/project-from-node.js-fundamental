import db from '../models'
import { Op } from 'sequelize'
import { User } from '../entity/user'

const getAllUsers = async () => {
    const allUsers = await db.User.findAll()
    return JSON.stringify(allUsers)
}

const createUser = async (user: User) => {
    await db.User.create(user)
}

const updateUser = async (user: User) => {
    await db.User.update(user, {
        where: {
          id: user.id
        }
    });
}

const getUserById = async (id: string) => {
    const user = await db.User.findOne({
        where: { id }
    });
    return JSON.stringify(user)
}

const removeUser = async (id: string) => {
    db.User.destroy({
        where: { id }
    });
}

const getAutoSuggest = async (loginSubstr: string, limit: string) => {
    const users = await db.User.findAll({
        limit: +limit,
        where: {
            login: {
                [Op.like]: `%${loginSubstr}%`
            }
        }
    })
    return JSON.stringify(users)
}

export {
    getAllUsers,
    getUserById,
    removeUser,
    createUser,
    updateUser,
    getAutoSuggest
}
