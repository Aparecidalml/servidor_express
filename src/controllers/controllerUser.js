import User from '../models/modelUser.js'
import crypto from 'crypto'
import path from   'path'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'

export const listarUsuarios = async (req, res) => {
    try{
        const usuarios = await User.findAll()
        if(!usuarios) return res.status(400).json({mensagem: 'Não tem usuários!'})
        res.status(200).json(usuarios)
    }catch(err){
        res.status(500).json({mensagem: 'Erro no servidor!'})
    }
}

export const salvarUsuario = async (req, res) => {
    const {nome, email, perfil, senha} = req.body
    if(!nome && !email && !senha) return res.status(400).json({mensagem: 'Preencha todos os campos!'})
    try{
        // exemplo com crypto
        // const senhaCript = crypto.createHash('sha256')
        // senhaCript.update(senha)
        // const senhaOK = senhaCript.digest('hex')
        // console.log(senhaOK)
        const senhaCript = await bcrypt.hash(senha, 10) // criptografa a senha
        await User.create({nome: nome, email: email, perfil: perfil, senha: senhaCript})
        // res.status(200).json({mensagem: 'Usuário criado com sucesso!'})
        res.sendFile(path.resolve('./src/public/html/login.html'))
    }catch(err){
        res.status(500).json({mensagem: 'Erro no servidor!'})
    }
}

export const cadastrarUsuario = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroUsuario.html'))
}

export const atualizarUsuario = async(req, res) => {
    const {nome, email, perfil, senha} = req.body
    if(!nome && !email && !senha) return res.status(400).json({mensagem: 'Preencha todos os campos!'})
    try{
        const usuarioBD = await User.findOne({where: {email: email}})
        if(!usuarioBD) return res.status(400).json({msg: 'Usuário não existe!'})
        const senhaCript = await bcrypt.hash(senha, 10) // criptografa a senha
        await User.update({nome: nome, email: email, perfil: perfil,  senha: senhaCript}, {where: { idUser: usuarioBD.idUser}})
        res.status(200).json({msg: 'Usuário atualizado!'})       
    }catch(err){
        res.status(500).json({mensagem: 'Erro no servidor!'})
    }
}

export const removerUsuario = async (req, res) => {
    const id = req.params.id
    try{
        const usuarioBD = await User.findOne({where: {idUser: id}})
        console.log(usuarioBD)
        if(!usuarioBD) return res.status(400).json({msg: 'Usuário não existe!'})
        await User.destroy({where: {idUser: id}})
        res.status(200).json({msg: 'Usuário removido com sucesso!'})  
    }catch(err){
        res.status(500).json({mensagem: 'Erro no servidor!'})
    }    
}

export const atualizarParcialUsuario = async (req, res) => {
    const id = req.params.id
    const {nome, email, perfil, senha} = req.body  
    try{
        const usuarioNovo = {}
        if(nome) usuarioNovo.nome = nome
        if(email) usuarioNovo.email = email
        if(perfil) usuarioNovo.perfil = perfil
        if(senha) {
            const senhaCript = await bcrypt.hash(senha, 10) // criptografa a senha
            usuarioNovo.senha =   senhaCript 
        }
        const usuarioBD = await User.findOne({where: {idUser: id}})
        if(!usuarioBD) return res.status(400).json({msg: 'Usuário não existe!'})       
        await User.update(usuarioNovo, {where: { idUser: id}})
        res.status(200).json({msg: 'Usuário atualizado!'})       
    }catch(err){
        res.status(500).json({mensagem: 'Erro no servidor!'})
    }
}