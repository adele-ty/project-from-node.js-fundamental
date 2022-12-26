import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './router/user'
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config()
const app:Application = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    if (req.url === '/api/login') next('route')
    const verified: JwtPayload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWTSecret) as JwtPayload;
    if (Date.now() < verified.exp * 1000) next()
    else throw new Error('Unauthorized!')
})
app.use('/api', userRouter)

app.listen(3000, function() {
    console.log('api server running at http://127.0.0.1:3000')
})