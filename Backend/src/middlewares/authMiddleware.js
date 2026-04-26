import passport from 'passport'

const isLoggedIn = (req, res, next) => {
    const passportMiddleware = passport.authenticate('bearer', { session: false })
    passportMiddleware(req, res, next)
}

export { isLoggedIn }