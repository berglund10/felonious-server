import UsersController from "../controllers/Users.controller.js"

const routes = (app) => {

    app.get('/userinfo', UsersController.getUserChar)
    app.post('/login', UsersController.loginUser)
    app.get('/users', UsersController.getAllUsers)
    app.put('/users', UsersController.deleteUserChar)
    app.post('/users', UsersController.createUser)
    app.post('/createchar', UsersController.createCharacter)
    app.put('/createchar', UsersController.setUserChar)

}

export default {
    routes
}