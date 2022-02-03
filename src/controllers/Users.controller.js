import pool from '../../db.js'
import StatusCode from '../../config/StatusCode.js'


const createUser = async (req, res) => {
    try {
        const {username, password, email} = req.body
        const response = await pool.query('INSERT INTO users(username, password, email) VALUES ($1, $2, $3)', 
        [username, password, email])
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte skapa användaren",
            error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM users')
        res.status(StatusCode.OK).send(response.rows)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        const response = await pool.query('SELECT * FROM users WHERE username = $1 and password = $2', 
        [username, password])
        if(response.rows[0].character_id === null) {
            console.log("har ingen char")
        }
        res.status(StatusCode.OK).send(response)

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte logga in denna användare",
            error: error.message
        })

    }
}

const getUserChar = async (req, res) => {
    try {
        const username = req.query.username
        const response = await pool.query('SELECT * FROM users, character WHERE users.character_id = character.character_id AND users.username = $1',
        [username])
        console.log(response.rows)
        res.status(StatusCode.OK).send(response.rows)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Hittade ingen char",
            error: error.message
        })
    }
}

const deleteUserChar = async (req, res) => {
    try {
        const {username} = req.body
        await pool.query('UPDATE users SET character_id = null WHERE users.username = $1',
        [username])
        res.status(StatusCode.OK).send("Character was removed")
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Hittade ingen att deleta",
            error: error.message
        })
    }
}

const setUserChar = async (req, res) => {
    try {
        const {username, character_id} = req.body
        const response = await pool.query('UPDATE users SET character_id = $2 where users.username = $1',
        [username, character_id])
        console.log(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte lägga till char",
            error: error.message
        })
    }
}


const createCharacter = async (req, res) => {
    try {
        const {name, health, strength} = req.body
        const response = await pool.query('INSERT INTO character(name, health, strength) VALUES ($1, $2, $3) RETURNING character_id', 
        [name, health, strength])
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte skapa användaren",
            error: error.message
        })
    }
}

export default {
    getAllUsers,
    loginUser,
    getUserChar,
    deleteUserChar,
    createUser,
    createCharacter,
    setUserChar
}