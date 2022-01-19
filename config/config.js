
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


const connectToDatabase = async () => {
    try {
        const DB_URL = process.env.DATABASE_URL
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true,})
        console.log("sucessfully connected")
    } catch (error) {
        console.log("Could not connect " + error)
        process.exit(0)
    }
}

const connectToPort = (app) => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server running on ${port}`)
    })


}

export default {
    connectToDatabase,
    connectToPort
}
