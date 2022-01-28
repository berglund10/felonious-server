import UserController from "../controllers/User.controller.js"
import UsersController from "../controllers/Users.controller.js"

const routes = (app) => {

    app.get('/userinfo', UsersController.getUserChar)
    app.post('/login', UsersController.loginUser)
    app.get('/users', UsersController.getAllUsers)
    app.delete('/users', UsersController.deleteUserChar)
    app.post('/users', UsersController.createUser)


    app.get('/user', UserController.getAllUsers)
    app.get('/user/:userId', UserController.getUserWithId)
    app.get('/searchuser', UserController.getUserWithUsernameQuery)
    app.put('/user/:userId', UserController.updateUser)
    app.delete('/user/:userId', UserController.deleteUser)
    app.get('/checkuser', UserController.checkUser)
    app.put('/userR/:userId', UserController.removeCharRef)

}

export default {
    routes
}