import express from 'express'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
// import bdConexao from './config/database.js'
import sequelize, {sincronizarBD} from './config/orm.js'
import Cursos from './models/modelCursoORM.js'
import User from './models/modelUser.js'
import routeCurso from './routes/routeCurso.js'
import routeUser from './routes/routeUser.js'
import routeLogin from './routes/routeLogin.js'
import session from 'express-session'
import connectSqlite from 'connect-sqlite3'
import { apagarCache } from './middlewares/auth.js'
import cookieParser from 'cookie-parser'

const sqliteStore = connectSqlite(session)

sincronizarBD()

dotenv.config()

const app = express()

let PORT = process.env.EXPRESS_PORT 
let HOST = process.env.EXPRESS_HOST 

if(process.env.MODE_NODE === 'dev'){
    PORT = 3000
    HOST = 'localhost'
}

app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

app.use(express.static(path.join(import.meta.dirname, './public'))) //middleware para arquivos estáticos (como HTML, CSS, JS) da pasta 'public'
app.use(morgan('dev')) //middleware para logar as requisições no console

app.set('view engine', 'ejs') //configuração para usar o EJS como template engine
app.set('views', path.join(import.meta.dirname, './views')) //configuração para definir a pasta onde estão as views do EJS
//src/views
// app.use('/curso', routeCurso) // usando as rotas de curso httpp://localhost:3000/curso/endereço_da_rota

app.use(session ({
        store: new sqliteStore ({
            db: 'session.db',
            dir: './src/database',
            table: 'sessions',
            ttl: 60 * 60 * 24
        }),  
        secret: 'sistema_academico',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: { 
            maxAge: 1000 * 60 * 1, //ms tempo de interatividade
            httpOnly: true
            // expires: 1000 * 60 * 1 // tempo fixo       
        }
    })
)

app.use(cookieParser())

app.use(apagarCache)

app.use(routeCurso)
app.use(routeUser)
app.use(routeLogin)

app.get('/', (req, res) => {
    res.send('<h1> Página Inicial </h1>')
    // res.render('index')
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})