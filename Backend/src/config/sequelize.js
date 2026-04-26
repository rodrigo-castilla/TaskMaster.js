import Sequelize from 'sequelize'
import getConfig from './config'
export function initSequelize() {
    const { dbname, dbusername, dbpassword, dbhost, dbport, dbdialect } = getConfig()
    const seqConnection = new Sequelize(dbname, dbusername, dbpassword, {
        host: dbhost,
        port: dbport,
        dialect: dbdialect,
        dialectOptions: {
            allowPublicKeyRetrieval: true
        }
    })
    await seqConnection.authenticate()
    return reqConnection
}

const disconnectSequelize = async (connection) => {
    return connection.close()
}

export { initSequelize, disconnectSequelize }