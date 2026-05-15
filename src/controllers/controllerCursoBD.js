import path from "path"
import bdConexao from '../config/database.js'

export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body // desestruturação da requisição    
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    const sql = 'insert into cursos (cod, curso, ch, tipo) values (?, ?, ?, ?);'
    // bdConexao.query(sql, [cod, curso, ch, tipo], (err, curso) => {
    //     if(err){
    //         res.status(500).json({mensagem: 'Erro ao cadastrar o curso: ', err})
    //         return
    //     }
    //     res.redirect('/cursos') // redireciona para outra rota 
    // })
    try{
        await bdConexao.execute(sql, [cod, curso, ch, tipo])
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

export const buscarCurso = (req, res) => {
     const cursoEncontrado = cursos.find(c => c.curso === req.params.curso)
    if(!cursoEncontrado){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }    
    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
}

export const atualizarCurso = (req, res) => {
     const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(500).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(!curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }

    cursoEncontrado.curso = curso
    cursoEncontrado.ch = ch
    cursoEncontrado.tipo = tipo  
    
    const cursoAtual = {cod, curso, ch, tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
}

export const removerCurso = (req, res) => {
     const cursoEncontrado = cursos.findIndex(c => c.cod === req.params.cod)

    if(cursoEncontrado === -1){
      return res.status(500).json({mensagem: 'Curso não encontrado'})
    }

    cursos.splice(cursoEncontrado, 1)

    res.status(200).json({mensagem: 'Curso Removido com sucesso!', cursos})
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