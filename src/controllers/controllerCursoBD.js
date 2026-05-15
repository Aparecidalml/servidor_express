import path from "path"
import bdConexao from '../config/database.js'

export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body // desestruturação da requisição    
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    const sql = 'insert into cursos (cod, curso, ch, tipo) values (?, ?, ?, ?);'
    //sícrono com callback
    // bdConexao.query(sql, [cod, curso, ch, tipo], (err, curso) => {
    //     if(err){
    //         res.status(500).json({mensagem: 'Erro ao cadastrar o curso: ', err})
    //         return
    //     }
    //     res.redirect('/cursos') // redireciona para outra rota 
    // })
    //assíncrono com async/await
    try{
        const [cursoNovo] = await bdConexao.execute(sql, [cod, curso, ch, tipo])
        console.log(cursoNovo)
        res.redirect('/cursos')  
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

export const alterarCurso = (req, res) => {
    const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(curso !== undefined && curso !== null  && curso !== '') {
        cursoEncontrado.curso = curso
    }
    if ( ch !== undefined && ch !== null  && ch !== '' ){
            cursoEncontrado.ch = Number(ch)
    }
    if(tipo !== undefined && tipo !== null  && tipo !== ''){
        cursoEncontrado.tipo = tipo  
    }
    
    const cursoAtual = {
        cod: cod,  
        curso: cursoEncontrado.curso, 
        ch: cursoEncontrado.ch, 
        tipo: cursoEncontrado.tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
}

export const cadastroCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroCurso.html'))
}