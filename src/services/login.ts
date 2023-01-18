import db from '../models'
import jwt from 'jsonwebtoken'

const login = async (email: string, password: string) => {
    let user = await db.User.findOne({
        where: {
            email
        }
    })
    user = JSON.stringify(user)
    user = JSON.parse(user)
    if (!user) throw new Error('The user does not exist')
    if (user.password !== password) throw new Error('password is wrong')
    else {
        const token = jwt.sign({...user, password: ''}, process.env.JWTSecret, { expiresIn: process.env.Expires })
        return 'Bearer ' + token
    } 
}

export { login }
