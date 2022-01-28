import pool from '../../db.js'
import StatusCode from '../../config/StatusCode.js'
import { response } from 'express'


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
        const reponse = await pool.query('UPDATE users SET character_id = null where users.username = $1',
        [username])
        console.log(response)
        send.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Hittade ingen att deleta",
            error: error.message
        })
    }
}

export default {
    getAllUsers,
    loginUser,
    getUserChar,
    deleteUserChar,
    createUser
}