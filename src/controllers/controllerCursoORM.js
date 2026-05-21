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
        const cursoEncontrado = await Curso.findOne({where: {cod: req.params.cod}}, {raw: true})
        const id = cursoEncontrado.idCurso
        console.log(id)
        if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})
        const {curso, ch, tipo} = req.body
        if(!curso && !ch && !tipo) {            
            return res.status(400).json({mensagem: 'Preencha pelo menos um campo!'})
        }
        await Curso.update (req.body, {where: {idCurso: id}})
         //res.render('listarCursos', {cursos: [cursoEncontrado]})
         res.redirect('/cursos')  
        }catch(err){
            console.log(err)
            res.status(500).json({ erro: err.message})
    }

}

export const removerCurso = async (req,res) => {
    const cod = req.params.cod
    try{
        let deleteCurso = `delete from cursos where cod = ?`
        await bdConexao.execute(deleteCurso, [cod])
    }
    catch(err){
        res.status (500).json({mensagem: 'nao encontrei seu curso, volte mais tarde',err})
    }

}

export const alterarCurso = async (req, res) => {  
    const { curso, ch, tipo } = req.body
    const { cod } = req.params
    try {
        let campos = []
        let valores = []
        if(curso !== undefined){
            campos.push('curso = ?')
            valores.push(curso)
        }
        if(ch !== undefined){
            campos.push('ch = ?')
            valores.push(ch)
        }
        if(tipo !== undefined){
            campos.push('tipo = ?')
            valores.push(tipo)
        }
        if(campos.length === 0){
            return res.status(400).json({mensagem: 'Nenhum campo enviado para atualização' })

        }
        valores.push(cod)
        const uptade = campos.join(', ')
        const sql = `UPDATE cursos SET ${uptade} WHERE cod = ? `
        const [resultado] = await bdConexao.execute(sql, valores)   
        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: 'Curso não encontrado' })
        }
        res.status(200).json({mensagem: 'Curso atualizado parcialmente', resultado})
    } catch (error) {
        console.log(error)
        res.status(500).json({erro: error.message })
    }
}


export const cadastroCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroCurso.html'))
}