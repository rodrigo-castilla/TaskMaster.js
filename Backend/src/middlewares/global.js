import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export function loadGlobalMiddlewares(app) {
    app.use(express.json())
    app.use(cors())
    app.use(helmet({
        crossOriginResourcePolicy: false
    }))
}

export default loadGlobalMiddlewares