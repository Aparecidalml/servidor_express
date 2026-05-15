import express from 'express'
import { listarCursos,  criarCurso, /*buscarCurso, atualizarCurso, removerCurso, alterarCurso,*/ cadastroCurso } from '../controllers/controllerCursoBD.js'

const routeCurso = express.Router()

routeCurso.get('/cadastro', cadastroCurso)

//Rota para adicionar curso
routeCurso.post('/curso', criarCurso)

//rota para mostrar todos os cursos
routeCurso.get('/cursos', listarCursos)

// rota para buscar um curso pelo nome do curso
// routeCurso.get('/curso/:curso', buscarCurso)

// // rota atulizar todos os dados
// routeCurso.put('/curso/:cod', atualizarCurso)

// // Rota para remover curso pelo código
// routeCurso.delete('/curso/:cod', removerCurso)

// // atualizar um ou mais dados do curso
// routeCurso.patch('/curso/:cod', alterarCurso)

export default routeCurso
