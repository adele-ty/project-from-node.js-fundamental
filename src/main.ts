import express, { Application } from 'express'
import cors from 'cors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import userRouter from './routers/controllers/user'
import groupRouter from './routers/controllers/group'
import UserAssignRouter from './routers/controllers/userAssignment'

dotenv.config()
const app:Application = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    const isNotExpired = () => {
        const verified: JwtPayload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWTSecret) as JwtPayload;
        if (Date.now() < verified.exp * 1000) return true
        else return false
    }
    if (req.url === '/api/login') next()
    else {
        const toNext: boolean = isNotExpired()
        if (toNext) next()
        else throw new Error('Unauthorized!')
    }
})

app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', UserAssignRouter)

app.listen(3000, function() {
    console.log('api server running at http://127.0.0.1:3000')
})
