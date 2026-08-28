// middleware: verifica que el usuario autentificado tenga rol admin 
function verificarAdmin(req, res, next) {
    if (!req.usuario){
        return res.status(401).json({ error: 'sin autentificacion'});
    }
    if (req.usuario.rol !== 'admin'){
        return res.status(403).json({ error: 'Acceso denegado - se requiere rol de admin' });
    }
    next(); // solo llega  aqui si el token existe y el rol es afmin
}

module.exports = verificarAdmin;