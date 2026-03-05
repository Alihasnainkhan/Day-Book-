const mysql = require('mysql2/promise');

async function createTable() {
    try {
        const connection = await mysql.createConnection({
            host: 'mysql-3ebda4f-ah9742400-21d2.j.aivencloud.com',
            user: 'avnadmin',
            password: Buffer.from('QVZOU19PazJ4QjR2ZUdLeVNVYWdkOEo0', 'base64').toString('utf-8'),
            database: 'defaultdb',
            port: 10784,
            ssl: { rejectUnauthorized: false }
        });

        console.log("Connected to database.");

        const createQuery = `
            CREATE TABLE IF NOT EXISTS reminders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                remind_at DATETIME NOT NULL,
                repeat_type ENUM('none', 'daily', 'weekly', 'monthly') DEFAULT 'none',
                is_completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;

        await connection.query(createQuery);
        console.log("Reminders table created!");

        await connection.end();
    } catch (err) {
        console.error("Error:", err);
    }
}

createTable();
