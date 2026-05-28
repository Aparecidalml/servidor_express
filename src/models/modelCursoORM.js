import sequelize from "../config/orm.js"
import { DataTypes } from "sequelize"

// define (nome do modelo, atributos, opções)

const Cursos = sequelize.define('Cursos', {
    idCurso: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cod: {
        type: DataTypes.INTEGER,
        allowNull: false       
    },
    curso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            max: 50
        }
    },
    ch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
        // references: {
        //     model: 'escola',
        //     primaryKey: ''
        // }
        // FOREIGN KEY (TIPO) REFERENCES ESCOLA(ID)
    }
},
{
    tableName: 'cursos',
    timestamps: false,
    charset: 'utf8',
}
)


export default Cursos