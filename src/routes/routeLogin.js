import express from 'express'
import { login, validarLogin, logout } from '../controllers/controllerLogin.js'

const routeLogin = express.Router()

routeLogin.get('/login', login)
routeLogin.post('/validarLogin', validarLogin)
routeLogin.post('/logout', logout)

export default routeLogin