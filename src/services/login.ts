import db from '../models'
import jwt from 'jsonwebtoken'
import logger from '../logger'

const login = async (email: string, password: string) => {
    let user = await db.User.findOne({
        where: {
            email
        }
    })
    user = JSON.stringify(user)
    user = JSON.parse(user)
    if (!user) { 
        logger.error('The user does not exist')
        return
    } else if (user.password !== password) {
        logger.error('password is wrong')
        return
    } else {
        const token = jwt.sign({...user, password: ''}, process.env.JWTSecret, { expiresIn: process.env.Expires })
        return 'Bearer ' + token
    } 
}

export { login }
