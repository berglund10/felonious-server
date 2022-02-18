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

const getAllBestar = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM bestar')
        res.status(StatusCode.OK).send(response.rows)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }
}

const getOneBest = async (req, res) => {
    try {
        const name = req.query.name
        const response = await pool.query('SELECT * FROM bestar WHERE name = $1',
        [name])
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        const response = await pool.query('SELECT * FROM users WHERE username = $1 and password = $2', 
        [username, password])
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

const updateUserRundor = async (req, res) => {
    try {
        const {username, rundor} = req.body
        const charObj = await pool.query('SELECT character_id from users WHERE users.username = $1',
        [username])
        const charId = charObj.rows[0].character_id
        const charRundor = await pool.query('SELECT rundor from character WHERE character.character_id = $1',
        [charId])
        console.log(charRundor.rows[0].rundor)
        const rundorCheck = charRundor.rows[0].rundor
        if(rundorCheck - rundor >= 0) {
            await pool.query('UPDATE character SET rundor = rundor - $2 WHERE character.character_id = $1',
            [charId, rundor])
            res.status(StatusCode.OK).send("Character rundor was updated" + charId)
        }
        else {
            res.status(StatusCode.OK).send("Du hade för lite rundor")
        }

        console.log(charId)
        
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Hittade ingen char",
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
        const {name, health, strength, rundor, mynt} = req.body
        const response = await pool.query('INSERT INTO character(name, health, strength,rundor,mynt) VALUES ($1, $2, $3, $4, $5) RETURNING character_id', 
        [name, health, strength, rundor, mynt])
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
    setUserChar,
    getAllBestar,
    getOneBest,
    updateUserRundor
}