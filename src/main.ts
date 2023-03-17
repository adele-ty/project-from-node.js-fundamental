import express, { Application } from 'express'
import cors from 'cors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import process from 'process'
import userRouter from './routers/controllers/user'
import groupRouter from './routers/controllers/group'
import UserAssignRouter from './routers/controllers/userAssignment'
import logger from './logger'

dotenv.config()
const app:Application = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const isValidToken = (): boolean => {
        const verified: JwtPayload = jwt.verify(token, process.env.JWTSecret) as JwtPayload;
        if (Date.now() < verified.exp * 1000) return true
        else return false
    }

    if (req.url === '/api/login') next()
    else {
        if (!token.trim()) 
            res.send({ statusCode: 401, message: 'Unauthorized!'})
        if (isValidToken()) next()
        else {
            res.send({
                statusCode: 403,
                message: 'Forbidden!'
            })
        }
    }
})

app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', UserAssignRouter)

app.use((err: any, req: any, res: any, next: any) => {
    const { method, url, params, body } = req
    logger.error('There are some errors', method, params, url, body)
    next()
})

process.on('uncaughtException', err => {
    throw new Error(err.toString())
})

// Promise.reject('Invalid password')

process.on('unhandledRejection', (reason, promise) => {
    throw new Error('get a rejected promise, reason is: ' + reason)
})

app.listen(3000, function() {
    console.log('api server running at http://127.0.0.1:3000')
})

export default app
