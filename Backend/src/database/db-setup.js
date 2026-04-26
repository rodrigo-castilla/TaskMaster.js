import config from '../config/config.js'
import { exec as execCallback } from 'node:child_process'
import { promisify } from 'node:util'
const exec = promisify(execCallback)

async function dbSetup() {
    try {
        console.log("Initializing DB...")
        const { database, username, password, host, port, root, rootPassword } = config.development

        // Create DB
        try {
            await exec(`mysql -h ${host} -P ${port} -u ${root} -p'${rootPassword}' -e "CREATE DATABASE IF NOT EXISTS ${database}; GRANT ALL PRIVILEGES ON ${database}.* TO '${username}'@'localhost'; FLUSH PRIVILEGES;"`)
            console.log("Created DB and granted privileges")
        } catch (err) {
            console.log("An error occurred:", err)
        }

        // Clean DB
        try {
            // get migrations on FS
            const migrationsOut = await exec('ls -1 src/database/migrations/*.js 2>/dev/null | xargs -I {} basename {} || echo ""')
            const migrationInFS = migrationsOut.stdout
                                    .trim()
                                    .split("\n")
                                    .filter(f => f && !f.startsWith('config'))
            
            // get migrations on DB
            const dbMigrationsOut = await exec(`mysql -h ${host} -P ${port} -u ${username} -p'${password}' ${database} -e "SELECT name FROM SequelizeMeta" --batch --skip-column-names 2>/dev/null || echo ""`)
            const dbMigrations = dbMigrationsOut.stdout
                                    .trim()
                                    .split("\n")
                                    .filter(f => f)
            
            // get orphaned migrations (In DB, not in FS)
            const orphanedMigrations = dbMigrations.filter(dbMig => !migrationInFS.includes(dbMig))
            
            if (orphanedMigrations.length > 0) {
                console.log(`Existing orphaned migrations: ${orphanedMigrations}`)
                for (const orph of orphanedMigrations) {
                    const deleteCmd = `mysql -h ${host} -P ${port} -u ${username} -p'${password}' ${database} -e "DELETE FROM SequelizeMeta WHERE name = '${orph}'"`
                    await exec(deleteCmd)
                    console.log("Eliminated: ", orph)
                }
            } else {
                console.log("No existing orphaned migrations")
            }
        } catch (err) {
            console.log("An error occurred: ", err)
        }
        
        // Undo migrations for cleaning
        try {
            await exec("npx sequelize-cli db:migrate:undo:all")
            console.log("Undo all migrations successfully")
        } catch (err) {
            console.log("An error occurred: ", err)
        }

        // Run new migrations
        try {
            await exec("npx sequelize-cli db:migrate")
            console.log("Created all migrations successfully")
        } catch (err) {
            console.log("An error occurred: ", err)
        }

        // Run new seeders
        try {
            await exec("npx sequelize-cli db:seed:all")
            console.log("Created all seeders successfully")
        } catch (err) {
            console.log("An error occurred: ", err)
        }
    } catch (err) {
        console.log("An error ocurred: ", err)
    }
}

dbSetup()