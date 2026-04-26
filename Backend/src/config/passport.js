import passport from "passport";
import { Strategy as BearerStrategy } from 'passport-http-bearer'

const initPassport = function () {
    passport.use(new BearerStrategy(
        async function (token, done) {
            try {
                const user = await UserController.findByToken(token)
                return done(null, user, { scope: 'all' })
            } catch (err) {
                return done(null, false, { message: err.message })
            }
        }
    ))
}