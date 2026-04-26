import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(execCallback);

async function dbPopulate() {
    try {
        console.log("Starting file generation...");

        // get models names
        const modelsOut = await exec('ls -1 src/models/*.js 2>/dev/null | xargs -I {} basename {} || echo ""');
        const models = modelsOut.stdout
            .trim()
            .split("\n")
            .filter(f => f && f !== 'models.js')
            .map(f => f.replace('.js', '').toLowerCase());
        if (!models.length) {
            console.log("No models found to populate.");
            return;
        }
        
        console.log(`Found models: ${models.join(', ')}`);

        // populate migrations
        console.log("\nGenerating migrations...");
        const migrationsOut = await exec('ls -1 src/database/migrations/*.js 2>/dev/null | xargs -I {} basename {} || echo ""');
        const existingMigrations = migrationsOut.stdout.trim().split("\n");

        for (const model of models) {
            if (existingMigrations.some(m => m.endsWith(`create-${model}.js`))) {
                console.log(`Migration for ${model} already exists. Skipping...`);
                continue;
            }
            await exec(`npx sequelize-cli migration:generate --name create-${model}`);
            console.log(`Generated migration for: ${model}`);
        }

        // populate seeders
        console.log("\nGenerating seeders...");
        const seedersOut = await exec('ls -1 src/database/seeders/*.js 2>/dev/null | xargs -I {} basename {} || echo ""');
        const existingSeeders = seedersOut.stdout.trim().split("\n");

        for (const model of models) {
            if (existingSeeders.some(s => s.endsWith(`${model}-seeder.js`))) {
                console.log(`Seeder for ${model} already exists. Skipping...`);
                continue;
            }
            await exec(`npx sequelize-cli seed:generate --name ${model}-seeder`);
            console.log(`Generated seeder for: ${model}`);
        }

        console.log("\nSuccessfully populated migrations and seeders!");
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

dbPopulate();