import express from 'express'
import { login, validarLogin } from '../controllers/controllerLogin.js'

const routeLogin = express.Router()

routeLogin.get('/login', login)
routeLogin.post('/login', validarLogin)

export default routeLogin