import User from '../models/modelUser.js'
import jwt from 'jsonwebtoken'

const perfils = ['Admin', 'Professor', 'Estudante']

export const autenticar = async (req, res, next) => {

    // if (!req.session.usuario) return res.redirect('/login')
    // const usuario = await User.findByPk(req.session.usuario.id)
    // if (!usuario) {
    //     req.session.destroy(() => {})
    //     return res.status(401).json({mensagem: 'Usuário não encontrado' })
    // }

    if(!req.cookies.token) return res.redirect('/login')
    
    try{
        const usuario = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.usuario = usuario
        next()
    }catch(err){
        return res.redirect('/login')
    }
}

export function validarPerfil(perfils) {
    return (req, res, next) => {
        // const perfil = req.session.usuario.perfil
        const perfil = req.usuario.perfil
        if (!perfils.includes(perfil)) return res.status(403).send('Acesso Negado!')
        next()
    }
}

export const apagarCache = (req, res, next) => {

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    next()
}

