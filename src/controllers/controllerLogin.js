import User from '../models/modelUser.js'
import path from   'path'
import bcrypt from 'bcrypt'
import session from 'express-session'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/login.html'))
}

export const validarLogin = async (req, res) => {
    const {email, senha} = req.body
    if(!email && !senha) return res.status(400).send('Preencha todos os campos!')
    try{
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario) return res.status(400).json({msg: 'E-mail inválido!'})
        const senhaDescript = await bcrypt.compare(senha, usuario.senha)
        // console.log(senhaDescript)
        if(!senhaDescript) return res.status(400).json({msg: 'Senha Inválida!'})
         
        // session    
        // req.session.regenerate((err) => {
        //     if(err) return res.status(500).json({msg: 'Erro ao salvar a sessão.'})
        //     req.session.usuario = {
        //         id: usuario.idUser,
        //         nome: usuario.nome,
        //         perfil: usuario.perfil
        //     }
        //     res.render('index', {usuario: usuario})
        // })     

        //JWT
        const token = jwt.sign(
            {
                id: usuario.idUser,
                nome: usuario.nome,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1min',
                algorithm: 'HS256',
                issuer: 'sys-academico'
            }
        )

        res.cookie('token', token, 
            { 
                httpOnly: true, 
                secure: true, 
                maxAge: 1000 * 60 * 1 
            })

        res.render('index', {usuario: usuario})

    }catch(err){
        res.status(500).json({msg: 'Erro no servidor!'})
    }
}

export const logout = (req, res) => {
    // req.session.destroy((err) => {
    //     if(err) return res.status(500).send('Erro ao sair!')
    //     res.clearCookie('connect.sid')
    //     return res.redirect('/login')
    // })

    res.clearCookie('token',   
        { 
            httpOnly: true, 
            secure: true, 
            maxAge: 1000 * 60 * 1 
        })
    return res.redirect('/login')
}