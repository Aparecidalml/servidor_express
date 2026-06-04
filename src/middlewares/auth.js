const perfils = ['Adminstrador', 'Professor', 'Estudante']

export const autenticar = (req, res, next) => {

    if(!req.session.usuario) return res.redirect('/login')

    next()     
}

export function validaPerfil (perfils) {
    return (req, res, next) => {
        const perfil = req.session.usuario.perfil
        if(!perfils.includes(perfil)) return res.status(401).json({msg: 'Perfil não encontrado!'})

        next()
    }
}

