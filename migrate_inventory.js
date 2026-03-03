const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    const dbConfig = {
        host: 'mysql-3ebda4f-ah9742400-21d2.j.aivencloud.com',
        user: 'avnadmin',
        password: process.env.DB_PASSWORD || Buffer.from('QVZOU19PazJ4QjR2ZUdLeVNVYWdkOEo0', 'base64').toString('utf-8'),
        database: 'defaultdb',
        port: process.env.DB_PORT || 10784,
        ssl: { rejectUnauthorized: false }
    };
    const pool = mysql.createPool(dbConfig);

    try {
        console.log("Checking columns in inventory table...");
        const [columns] = await pool.query("SHOW COLUMNS FROM inventory");
        const columnNames = columns.map(c => c.Field);

        if (!columnNames.includes('unit')) {
            console.log("Adding 'unit' column...");
            await pool.query("ALTER TABLE inventory ADD COLUMN unit VARCHAR(20) DEFAULT 'kg'");
        }

        if (!columnNames.includes('price')) {
            console.log("Adding 'price' column...");
            await pool.query("ALTER TABLE inventory ADD COLUMN price DECIMAL(15, 2) DEFAULT 0.00");
        }

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await pool.end();
    }
}

migrate();
