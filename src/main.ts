import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './router/user'

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)

app.listen(3001, function() {
    console.log('api server running at http://127.0.0.1:3001')
})