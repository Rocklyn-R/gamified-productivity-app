const ensureAuthenticatedOnLoginSignup = (req, res, next) => {
    if (req.isAuthenticated()) {
       return res.redirect('/tasks');
    }
    next();
}

module.exports = { ensureAuthenticatedOnLoginSignup };