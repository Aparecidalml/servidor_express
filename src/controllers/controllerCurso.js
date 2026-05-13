import path from "path"
import { lerCursos, salvarCursos } from "../models/modelcurso.js"
import {v4 as uuid} from 'uuid' 

 const cursos = lerCursos() // [] ou dados do arquivo JSON

export const criarCurso = (req, res) => {
     // const {cod, curso, ch, tipo} = req.body // desestruturação da requisição
    // console.log(req.body) // visualizando o corpo da requisição     

    const cod = req.body.cod
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

    const cursoNovo = {id: uuid(), cod, curso, ch, tipo}

    cursos.push(cursoNovo)
    salvarCursos(cursos)
    
    res.status(200).json({mensagem: 'Curso cadastrado!', cursoNovo})

//    res.redirect('/cursos') // redireciona para outra rota
}

export function listarCursos (req, res) {
    res.render('listarCursos', {cursos})
    //res.status(200).json(cursos)
    
}

export const buscarCurso = (req, res) => {
     const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)
    if(!cursoEncontrado){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }    
    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
}

export const atualizarCurso = (req, res) => {
     const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(500).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(!curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }

    cursoEncontrado.curso = curso
    cursoEncontrado.ch = ch
    cursoEncontrado.tipo = tipo  
    
    const cursoAtual = {cod, curso, ch, tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
}

export const removerCurso = (req, res) => {
     const cursoEncontrado = cursos.findIndex(c => c.cod === req.params.cod)

    if(cursoEncontrado === -1){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }

    cursos.splice(cursoEncontrado, 1)

    res.status(200).json({mensagem: 'Curso Removido com sucesso!', cursos})
}

export const alterarCurso = (req, res) => {
    const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(curso !== undefined && curso !== null  && curso !== '') {
        cursoEncontrado.curso = curso
    }
    if ( ch !== undefined && ch !== null  && ch !== '' ){
            cursoEncontrado.ch = Number(ch)
    }
    if(tipo !== undefined && tipo !== null  && tipo !== ''){
        cursoEncontrado.tipo = tipo  
    }
    
    const cursoAtual = {
        cod: cod,  
        curso: cursoEncontrado.curso, 
        ch: cursoEncontrado.ch, 
        tipo: cursoEncontrado.tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
}

export const cadastroCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroCurso.html'))
}