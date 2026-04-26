import { check } from 'express-validator'


const create = [
    check('username').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('email').exists().isString().isEmail().normalizeEmail(),
    check('password').exists().isString().isStrongPassword({ minLength: 3 }),
    check('password').custom(value => !/\s/.test(value)).withMessage('Not valid spaces in password')
]

const update = [
    check('username').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('email').exists().isString().isEmail().normalizeEmail(),
    check('password').exists().isString().isStrongPassword({ minLength: 3 }),
    check('password').custom(value => !/\s/.test(value)).withMessage('Not valid spaces in password')
]

export { create, update }