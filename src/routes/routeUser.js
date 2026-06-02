import express, { Router } from 'express'
import { listarUsuarios, salvarUsuario, cadastrarUsuario, atualizarUsuario, removerUsuario, atualizarParcialUsuario } from '../controllers/controllerUser.js'

const routeUser = express.Router()

routeUser.get('/cadastroUsuario', cadastrarUsuario)
routeUser.post('/usuario', salvarUsuario)
routeUser.get('/usuarios', listarUsuarios)
routeUser.put('/usuario', atualizarUsuario)
routeUser.delete('/usuario/:id', removerUsuario)
routeUser.patch('/usuario/:id', atualizarParcialUsuario)

export default routeUser