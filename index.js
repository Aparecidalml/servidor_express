import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const HOST = 'localhost' // 127.0.0.1

let cursos = [{cod: '001', curso: 'Desenvolvimento de Sistema', ch: 1200, tipo: 'Técnico'}]

app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

app.get('/', (req, res) => {
    res.send('<h1> Página Inicial </h1>')
})

app.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve('cadastro.html'))
})

//Rota para adicionar curso
app.post('/curso', (req, res) => {  
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

app.get('/cursos', (req, res) => {
    res.status(200).json(cursos)
})

// rota atulizar todos os dados
app.get('/curso/:curso', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado'})
    }
    
    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
})

// rota atulizar todos os dados
app.put('/curso/:cod', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado'})
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
app.delete('/curso/:cod', (req, res) => {
     const cursoEncontrado = cursos.findIndex(c => c.cod === req.params.cod)

    if(cursoEncontrado === -1){
      return res.status(400).json({mensagem: 'Curso não encontrado'})
    }

    cursos.splice(cursoEncontrado, 1)

    res.status(200).json({mensagem: 'Curso Removido com sucesso!', cursos})
})

// atualizar um ou mais dados do curso
app.patch('/curso/:cod', (req, res) => {
    const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(curso !== undefined || curso !== null  || curso !== '') {
        cursoEncontrado.curso = curso
    }
    if ( ch !== undefined || ch !== null  || ch !== '' ){
            cursoEncontrado.ch = ch
    }
    if(tipo !== undefined || tipo !== null  || tipo !== ''){
        cursoEncontrado.tipo = tipo  
    }
    
    const cursoAtual = {
        cod: cod,  
        curso: cursoEncontrado.curso, 
        ch: cursoEncontrado.ch, 
        tipo: cursoEncontrado.tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})