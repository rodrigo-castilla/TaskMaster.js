import Sequelize from "sequelize";
import getConfig from '../config/config.js'
import loadUserModel from './User.js'
import loadTaskModel from './Task.js'

const sequelizeSession = new Sequelize(getConfig().dbname, getConfig().dbusername, getConfig().dbpassword, getConfig())
const User = loadUserModel(sequelizeSession, Sequelize.DataTypes)
const Task = loadTaskModel(sequelizeSession, Sequelize.DataTypes)

const db = { User, Task }

export { sequelizeSession, User, Task}