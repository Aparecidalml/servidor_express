import express from 'express'
import { autenticar} from '../middlewares/auth.js'
import { login, validarLogin, logout } from '../controllers/controllerLogin.js'

const routeLogin = express.Router()

routeLogin.get('/login', login)
routeLogin.post('/validarLogin', validarLogin)
routeLogin.post('/logout', autenticar, logout)

export default routeLogin