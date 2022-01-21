import CharacterController from "../controllers/Character.controller.js"

const routes = (app) => {

    app.post('/char', CharacterController.createCharacter)
    app.get('/char', CharacterController.getAllCharacters)

}

export default {
    routes
}