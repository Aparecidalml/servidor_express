import express from 'express'
import path from 'path'

const routerCurso = express()

let cursos = [{cod: '001', curso: 'Desenvolvimento de Sistema', ch: 1200, tipo: 'Técnico'}]

routerCurso.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastro.html'))
})

//Rota para adicionar curso
routerCurso.post('/curso', (req, res) => {  
    // const {cod, curso, ch, tipo} = req.body // desestruturação da requisição

    // console.log(req.body) // visualizando o corpo da requisição  

    const cod = req.body.cod
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

    const cursoNovo = {cod, curso, ch, tipo}

    cursos.push(cursoNovo)
    
   res.status(200).json({mensagem: 'Dados enviados!', cursoNovo})
})

routerCurso.get('/cursos', (req, res) => {
    res.status(200).json(cursos)
})

// rota atulizar todos os dados
routerCurso.get('/curso/:curso', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)

    if(!cursoEncontrado){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }
    
    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
})

// rota atulizar todos os dados
routerCurso.put('/curso/:cod', (req, res) => {
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
})

// Rota para remover curso pelo código
routerCurso.delete('/curso/:cod', (req, res) => {
     const cursoEncontrado = cursos.findIndex(c => c.cod === req.params.cod)

    if(cursoEncontrado === -1){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }

    cursos.splice(cursoEncontrado, 1)

    res.status(200).json({mensagem: 'Curso Removido com sucesso!', cursos})
})

// atualizar um ou mais dados do curso
routerCurso.patch('/curso/:cod', (req, res) => {
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
})

export default routerCurso
