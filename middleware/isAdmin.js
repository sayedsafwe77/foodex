let isAdmin = function(req, res, next) {
    if (req.user.type != 'admin') return res.sendStatus(403);
    next();
}
module.exports = isAdmin;