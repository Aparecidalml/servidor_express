import { Sequelize } from "sequelize"
import dotenv from 'dotenv'

dotenv.config()

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT   
// })

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {    
        dialect: 'postgres',
        dialectOptions: {
            ssl: {require: true,rejectUnauthorized: false }
        },
        logging: false
    }
)

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './src/database/bd.sqlite'
// })

const conexaoBD = async () => {
    try{
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    }catch(error){
        console.error('Erro ao conectar com o banco de dados:', error)
    }
}

conexaoBD()

export const sincronizarBD = async () => {
    try{
        await sequelize.sync({force: false})
        console.log('Banco de dados sincronizado com sucesso!')
    }catch(error){
        console.error('Erro ao sincronizar o banco de dados:', error)
    }
}

export default sequelize