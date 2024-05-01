const ensureAuthenticatedOnLoginSignup = (req, res, next) => {
    if (req.isAuthenticated()) {
       res.status(401).send();
    }
    next();
}

const checkAuthenticatedOnLoginSignup = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(200).json({ message: "User not signed in" });
}

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'You must be logged in to see this page' });
}

module.exports = { checkAuthenticatedOnLoginSignup, checkAuthenticated };