import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// export let cursos = [{
//     cod: '001', 
//     curso: 'Desenvolvimento de Sistema', 
//     ch: 1200, 
//     tipo: 'Técnico'
// }]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const caminho =  path.join(__dirname, '..', 'database', 'cursos.json')

export function lerCursos() {
    try {
        if (!fs.existsSync(caminho)) {
            fs.writeFileSync(caminho, '[]', 'utf-8')
        }
        const conteudo = fs.readFileSync(caminho, 'utf-8')
        if (conteudo === '') {
            return []
        } else {
            return JSON.parse(conteudo)
        }
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error)
        return []
    }
}

export function salvarCursos(cursos) {
    console.log(cursos)
    try {
        fs.writeFileSync(caminho, JSON.stringify(cursos, null, 2))
        console.log("Arquivo JSON criado com sucesso!")
    } catch (error) {
        console.error("Erro ao escrever o arquivo:", error)
    }
}