import dotenv from 'dotenv'

dotenv.config()


const notFound = (req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    const statuscode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statuscode)
    res.json({
        statuscode: statuscode,
        message: error.message,
        stacktrace: process.env.ENVIROMENT === 'PRODUCTION' ? 'lol' : error.stack,
    })
}

const isAuth = (req, res, next) => {
    req.query.admin === 'true' ? res.send("you are admin") : res.send("You cannot make calls")
    next()
}

export default {
    isAuth,
    errorHandler,
    notFound
}