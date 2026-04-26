import { User } from '../models/models.js'

const update = async (res, req) => {
    try {
        await User.update(req.body, { where: { id: req.user.id } })
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
        res.json(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

const userController = {
    update
}

export default userController