
import 'dotenv/config'

const config = {
    development: {
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        dialect: process.env.DBDIALECT,
        root: process.env.ROOT,
        rootPassword: process.env.ROOTPASSWORD
    }    
}

export default config