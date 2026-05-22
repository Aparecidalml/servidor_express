import path from "path"
import Curso from '../models/modelCursoORM.js'
import {Op} from 'sequelize'

export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body     
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        const cursoNovo = await Curso.create(req.body )
        console.log(cursoNovo)
        // res.status(200).json({mensagem: 'Curso criado com sucesso', cursoNovo})
        res.redirect('/cursos')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

export async function listarCursos (req, res) {
    try{
        const cursos = await Curso.findAll()
        // res.status(200).json(cursos)
        res.render('listarCursos', {cursos})
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

export const buscarCurso = async (req, res) => {
    const nomeCurso = req.params.curso

    try{
       const cursoEncontrado =  await Curso.findAll({where: {curso: {[Op.like]: `%${nomeCurso}%`}}})
       //select * from cursos where curso like '%nomeCurso%'
       res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Curso não encontrado', erro: err.message})  
    }
}

export async function atualizarCurso (req, res) {
    try{
        const cod = req.params.cod       
         //select * from cursos where cod = req.params.cod
        const cursoEncontrado = await Curso.findOne({where: {cod: cod}}, {raw: true})
        // console.log(cursoEncontrado.dataValues)
        const id = cursoEncontrado.idCurso    
        if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})
        const {curso, ch, tipo} = req.body
        //const cursoAtual = { curso: curso, ch: ch, tipo: tipo}
        if(!curso || !ch || !tipo) {            
            return res.status(400).json({mensagem: 'Preencha todos os campo!'})
        }
        await Curso.update (req.body, {where: {idCurso: id}}) //update cursos set curso = ?, ch = ?, tipo = ? where idCurso = id
        res.status(200).json({ mensagem: 'Curso atualizado com sucesso'})     
        // res.redirect('/cursos')           
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const removerCurso = async (req,res) => {
    const cod = req.params.cod
    try{
        const cursoEncontrado = await Curso.findOne({where: {cod: cod}}, {raw: true})
        if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})

        await Curso.destroy({where: {idCurso: cursoEncontrado.idCurso}})

        res.status(200).json({mensagem: 'Curso removido com sucesso'})
    }
    catch(err){
        res.status (500).json({mensagem: 'nao encontrei seu curso, volte mais tarde',err})
    }
}

export const alterarCurso = async (req, res) => {  
    try{
        const dados =  await Curso.findOne({where: {cod: req.params.cod}}, {raw: true})
        if(!dados) return res.status(404).json({mensagem: 'Curso não encontrado'}) 
        const dadosParciais = {}   
        if(req.body.curso) dadosParciais.curso = req.body.curso
        if(req.body.ch) dadosParciais.ch = req.body.ch
        if(req.body.tipo) dadosParciais.tipo = req.body.tipo
        console.log(req.body)
        await Curso.update (dadosParciais, {where: {idCurso: dados.idCurso}}) //update cursos set curso = ?, ch = ?, tipo = ? where idCurso = id
        res.status(200).json({ mensagem: 'Curso atualizado com sucesso'})

    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})

    }
}


export const cadastroCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroCurso.html'))
}