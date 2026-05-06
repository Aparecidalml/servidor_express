import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const HOST = 'localhost' // 127.0.0.1

let cursos = [{curso: 'Desenvolvimento de Sistema', ch: 1200, tipo: 'Técnico'}]

app.use(express.json()) // middleware
app.use(express.urlencoded({extended: true})) // middleware para requisição do formulário

app.get('/', (req, res) => {
    res.send('<h1> Página Inicial </h1>')
})

app.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve('cadastro.html'))
})

app.post('/curso', (req, res) => {    
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

    const cursoNovo = { curso: curso, ch: ch, tipo: tipo}

    cursos.push(cursoNovo)

    // const {curso, ch, tipo} = req.body // desestruturação da requisição
    // console.log(req.body) // visualizando o corpo da requisição
    res.status(200).json({mensagem: 'Dados enviados!', cursoNovo})
})

app.get('/cursos', (req, res) => {
    res.status(200).json(cursos)
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})