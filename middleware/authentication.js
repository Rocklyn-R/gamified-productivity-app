const ensureAuthenticatedOnLoginSignup = (req, res, next) => {
    if (req.isAuthenticated()) {
        "User is authenticated"
       res.status(401).send();
    }
    next();
}

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'You must be logged in to see this page' });
}

module.exports = { ensureAuthenticatedOnLoginSignup, checkAuthenticated };