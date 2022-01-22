import CharacterController from "../controllers/Character.controller.js"

const routes = (app) => {

    app.post('/char/:userId', CharacterController.createCharacterWithUserId)
    app.get('/char', CharacterController.getAllCharacters)

}

export default {
    routes
}