import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(12)

const loadModel = (sequelize, DataTypes) => {
    class User extends Model {

        static associate (models) {
                User.hasMany(models.Task, { foreignKey: 'userId' })
        }
    }

    User.init({
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, salt))
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    })
    return User
}

export default loadModel