import express from 'express'
import routerCurso from './src/routers/routerCurso.js'

const app = express()

const PORT = 3000
const HOST = 'localhost' // 127.0.0.1

app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

app.use('/curso', routerCurso) // usando as rotas de curso httpp://localhost:3000/curso/endereço_da_rota

app.get('/', (req, res) => {
    res.send('<h1> Página Inicial </h1>')
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})