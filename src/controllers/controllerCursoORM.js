import path from "path"
import Curso from '../models/modelCursoORM.js'


export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body     
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        const cursoNovo = await Curso.create(req.body )
        console.log(cursoNovo)
        res.status(200).json({mensagem: 'Curso criado com sucesso', cursoNovo})
        // res.redirect('/cursos')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

export async function listarCursos (req, res) {
    const sql = 'select * from cursos;'
    // bdConexao.query(sql, (err, cursos) => {
    //     if(err){
    //         res.status(500).json({mensagem: 'Erro ao listar os cursos: ', err})
    //         return
    //     }
    //     // res.status(200).json(cursos)
    //     res.render('listarCursos', {cursos})
    // })
    try{
        const [cursos] = await bdConexao.execute(sql)
        // res.status(200).json(cursos)
        res.render('listarCursos', {cursos})
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

export const buscarCurso = async (req, res) => {
    const nomeCurso = req.params.curso
    console.log(nomeCurso)
    const sql = 'select * from cursos where curso = ?;'
    try{
       const [cursoEncontrado] =  await bdConexao.execute(sql,[nomeCurso])
       res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Curso não encontrado', erro: err.message})  
    }
}

export const atualizarCurso = async (req, res) => {
    const {curso, ch, tipo} = req.body
    const cod = req.params.cod
    const dados = [curso, ch, tipo, cod]

    try {
        let update = `update cursos set curso = ?, ch = ?,tipo = ? where cod = ?`
            
        await bdConexao.execute(update, dados)
        
    } catch (error) {
        console.log('Erro ao tentar atualizar o curso: ', error.message);
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