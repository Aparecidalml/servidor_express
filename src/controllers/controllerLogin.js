import User from '../models/modelUser.js'
import path from   'path'
import bcrypt from 'bcrypt'


export const login = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/login.html'))
}

export const validarLogin = async (req, res) => {
    const {email, senha} = req.body
    if(!email && !senha) return res.status(400).json({msg: 'Preencha todos os campos!'})
    try{
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario) return res.status(400).json({msg: 'E-mail inválido!'})
        const senhaDescript = await bcrypt.compare(senha, usuario.senha)
        // console.log(senhaDescript)
        if(!senhaDescript) return res.status(400).json({msg: 'Senha Inválida!'})   
        res.render('index', {usuario: usuario.nome})
    }catch(err){
        res.status(500).json({msg: 'Erro no servidor!'})
    }
}