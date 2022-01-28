import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middleware from './src/middleware/Middleware.js'
import config from './config/config.js'
import bodyParser from 'body-parser'
import UserRoutes from './src/routes/User.routes.js'
import cors from 'cors'



const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('common'))

//CharacterRoutes.routes(app)
UserRoutes.routes(app)

app.use(Middleware.notFound)

app.use(Middleware.errorHandler)

config.connectToPort(app)

export default app