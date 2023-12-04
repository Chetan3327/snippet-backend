import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4000
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL)

const app = express()
app.use(express.json())
app.use(cors())

import snippetRouter from './routes/snippet.js'
app.use('/snippet', snippetRouter)

import sectionRouter from './routes/section.js'
app.use('/section', sectionRouter)

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
}) 