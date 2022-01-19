import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middleware from './src/middleware/Middleware.js'
import config from './config/config.js'
import bodyParser from 'body-parser'
import UserRoutes from './src/routes/User.routes.js'



const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('common'))



app.get('/home', Middleware.notFound, (req, res) => {
    res.send("hej")
})

app.get('/users', Middleware.isAuth, (req, res) => {
})

UserRoutes.routes(app)

app.use(Middleware.notFound)

app.use(Middleware.errorHandler)

config.connectToDatabase()
config.connectToPort(app)

export default app