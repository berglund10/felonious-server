import dotenv from 'dotenv'

dotenv.config()

const connectToPort = (app) => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server running on ${port}`)
    })


}

export default {
    connectToPort
}
