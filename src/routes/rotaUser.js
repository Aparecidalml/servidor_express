import express, { Router } from 'express'
import { listarUsuarios, criarUsuario, cadastrarUsuario } from '../controllers/controllerUser.js'

const routeUser = express.Router()

routeUser.get('/usuarios', listarUsuarios)
routeUser.post('/usuario', criarUsuario)
routeUser.get('/cadastroUsuario', cadastrarUsuario)

export default routeUser