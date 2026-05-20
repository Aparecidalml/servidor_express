import express from 'express'
import routeCurso from './routes/routeCurso.js'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bdConexao from './config/database.js'
import sequelize from './config/orm.js'
import Cursos from './models/modelCursoORM.js'
import { sincronizarBD } from './config/orm.js'

sincronizarBD()

dotenv.config()

const app = express()

const PORT = process.env.EXPRESS_PORT || 3000
const HOST = process.env.EXPRESS_HOST || 'localhost'

app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

app.use(express.static(path.join(import.meta.dirname, './public'))) //middleware para arquivos estáticos (como HTML, CSS, JS) da pasta 'public'
app.use(morgan('dev')) //middleware para logar as requisições no console

app.set('view engine', 'ejs') //configuração para usar o EJS como template engine
app.set('views', path.join(import.meta.dirname, './views')) //configuração para definir a pasta onde estão as views do EJS

// app.use('/curso', routeCurso) // usando as rotas de curso httpp://localhost:3000/curso/endereço_da_rota

app.use(routeCurso)

app.get('/', (req, res) => {
    // res.send('<h1> Página Inicial </h1>')
    res.render('index', {nome: 'SENAC'})
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})