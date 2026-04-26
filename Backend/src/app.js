import dotenv from 'dotenv'
import express from 'express'
import loadGlobalMiddlewares from './middlewares/global'
import { disconnectSequelize, initSequelize } from './config/sequelize'
import loadRoutes from './routes'

const initApp = async () => {
    dotenv.config()
    const app = express()
    loadGlobalMiddlewares(app)
    loadRoutes(app)
    app.connection = await initSequelize()
    return app
}

const disconnectDB = async (app) => {
    try {
        await disconnectSequelize(app.connection)
        console.log("DB disconnected successfully")
    } catch (error) {
        console.log(eror)
    }
}

const initServer = async () => {
    console.log = global.originalConsoleLog || console.log
    try {
        const app = initApp()
        const port = process.env.DBPORT || 3000
        const server = await app.listen(port)
        return { server, app }
    } catch (error) {
        console.log(error)
    }
}

export { initApp, disconnectDB, initServer }