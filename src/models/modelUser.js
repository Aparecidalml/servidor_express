import sequelize from '../config/orm.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false        
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
    },
    {
        tableName: 'usuarios',
        charset: 'utf-8',
        timestamps: false
    }    
)

export default User