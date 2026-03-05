const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve frontend files globally

// Explicitly serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, 'index.html'));
});

// Database Connection Setup
// Database Connection Setup
let pool = mysql.createPool({
    host: 'mysql-3ebda4f-ah9742400-21d2.j.aivencloud.com',
    user: 'avnadmin',
    password: process.env.DB_PASSWORD || Buffer.from('QVZOU19PazJ4QjR2ZUdLeVNVYWdkOEo0', 'base64').toString('utf-8'),
    database: 'defaultdb',
    port: process.env.DB_PORT || 10784,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initDB() {
    try {
        // First ensure DB exists using a fresh connection w/o database selected
        const initialConnection = await mysql.createConnection({
            host: 'mysql-3ebda4f-ah9742400-21d2.j.aivencloud.com',
            user: 'avnadmin',
            password: process.env.DB_PASSWORD || Buffer.from('QVZOU19PazJ4QjR2ZUdLeVNVYWdkOEo0', 'base64').toString('utf-8'),
            port: process.env.DB_PORT || 10784,
            ssl: { rejectUnauthorized: false }
        });
        const dbName = 'defaultdb';
        await initialConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await initialConnection.end();

        console.log(`Connected to MySQL database: ${dbName}`);

        // Create users table for authentication
        const createUsersQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createUsersQuery);
        console.log("Users table ready.");

        // Create transactions table if it doesn't exist
        const createTransactionsQuery = `
            CREATE TABLE IF NOT EXISTS transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                details VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                type ENUM('incoming', 'outgoing') NOT NULL,
                amount DECIMAL(15, 2) NOT NULL,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await pool.query(createTransactionsQuery);
        console.log("Transactions table ready.");

        // Create inventory table if it doesn't exist
        const createInventoryQuery = `
            CREATE TABLE IF NOT EXISTS inventory (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                stock_in INT DEFAULT 0,
                stock_out INT DEFAULT 0,
                unit VARCHAR(20) DEFAULT 'kg',
                price DECIMAL(15, 2) DEFAULT 0.00,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await pool.query(createInventoryQuery);
        console.log("Inventory table ready.");

        // Create khata table if it doesn't exist
        const createKhataQuery = `
            CREATE TABLE IF NOT EXISTS khata (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                client_name VARCHAR(255) NOT NULL,
                notes TEXT,
                debit DECIMAL(15, 2) DEFAULT 0.00,
                credit DECIMAL(15, 2) DEFAULT 0.00,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await pool.query(createKhataQuery);
        console.log("Khata table ready.");

        // Create reminders table
        const createRemindersQuery = `
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
        await pool.query(createRemindersQuery);
        console.log("Reminders table ready.");

        // Ensure the Master Admin account exists
        const adminUsername = 'admin';
        const adminPassword = 'Ali1214@'; // Requested plain text password for admin
        const [existingAdmin] = await pool.query('SELECT * FROM users WHERE username = ?', [adminUsername]);

        if (existingAdmin.length === 0) {
            await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [adminUsername, adminPassword, 'admin']);
            console.log("Master Admin account created.");
        } else {
            // Force reset the admin password to standard just in case
            await pool.query('UPDATE users SET password = ?, role = ? WHERE username = ?', [adminPassword, 'admin', adminUsername]);
            console.log("Master Admin account verified.");
        }

    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Export the Express API for Vercel
module.exports = app;

if (require.main === module) {
    // Only run the listen command if executed locally
    initDB().then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running locally on port ${PORT}`);
        });
    });
}

// ================= AUTH API =================

app.post('/api/signup', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

        // Anyone can create a "user" account.
        // Prevent someone from sending role="admin" via API
        const userRole = 'user';

        // Check if user exists
        const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existing.length > 0) return res.status(400).json({ error: 'Username already exists' });

        // User requested: "admin ko in sb ka data password sb pta chl jay"
        // To show passwords to admin, we will store them as plain text. 
        // (Note: This is not secure for production, but satisfies the explicit user requirement).
        const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, userRole]);

        const token = jwt.sign({ id: result.insertId, username, role: userRole }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: 'User created successfully', token, role: userRole, username });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = users[0];

        // Support both plaintext (new requirement) and bcrypt (old existing users)
        let isMatch = false;
        if (password === user.password) {
            isMatch = true;
        } else {
            isMatch = await bcrypt.compare(password, user.password).catch(() => false);
        }

        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username, role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized!' });
        req.user = decoded; // Store user details {id, username, role}
        next();
    });
};

app.post('/api/change-password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password are required' });
        }

        // Fetch user's current hashed password
        const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = users[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        // Update the database with PLAIN TEXT password due to admin viewing requirements
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);

        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ error: 'Failed to change password', details: error.message });
    }
});

// ================= ADMIN API =================
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        // Fetch all users and their plain-text passwords so admin can see them
        const [rows] = await pool.query('SELECT id, username, password, role, created_at FROM users ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

// ================= TRANSACTIONS API =================
app.get('/api/transactions', verifyToken, async (req, res) => {
    try {
        let query;
        let params = [];
        if (req.user.role === 'admin') {
            query = `
                SELECT t.*, u.username as owner_name 
                FROM transactions t 
                LEFT JOIN users u ON t.user_id = u.id 
                ORDER BY t.date DESC, t.created_at DESC
            `;
        } else {
            query = `
                SELECT t.*, u.username as owner_name 
                FROM transactions t 
                LEFT JOIN users u ON t.user_id = u.id 
                WHERE t.user_id = ? 
                ORDER BY t.date DESC, t.created_at DESC
            `;
            params = [req.user.id];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: 'Failed to fetch transactions', details: error.message });
    }
});

// Add a new transaction
app.post('/api/transactions', verifyToken, async (req, res) => {
    try {
        const { date, details, type, amount, category } = req.body;

        // Basic validation
        if (!date || !details || !type || amount === undefined || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query = `
            INSERT INTO transactions (user_id, date, details, type, amount, category) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [req.user.id, date, details, type, amount, category]);

        res.status(201).json({
            message: 'Transaction added successfully',
            id: result.insertId
        });
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ error: 'Failed to add transaction', details: error.message });
    }
});

// Update an existing transaction
app.put('/api/transactions/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { date, details, type, amount, category } = req.body;

        if (!date || !details || !type || amount === undefined || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query = `
            UPDATE transactions 
            SET date=?, details=?, type=?, amount=?, category=? 
            WHERE id=? AND user_id=?
        `;
        const [result] = await pool.query(query, [date, details, type, amount, category, id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ error: 'Failed to update transaction', details: error.message });
    }
});

// Delete a transaction
app.delete('/api/transactions/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM transactions WHERE id=? AND user_id=?';

        const [result] = await pool.query(query, [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: 'Failed to delete transaction', details: error.message });
    }
});

// ================= INVENTORY API =================
app.get('/api/inventory', verifyToken, async (req, res) => {
    try {
        let query;
        let params = [];
        if (req.user.role === 'admin') {
            query = `
                SELECT i.*, u.username as owner_name 
                FROM inventory i 
                LEFT JOIN users u ON i.user_id = u.id 
                ORDER BY i.date DESC, i.created_at DESC
            `;
        } else {
            query = `
                SELECT i.*, u.username as owner_name 
                FROM inventory i 
                LEFT JOIN users u ON i.user_id = u.id 
                WHERE i.user_id = ? 
                ORDER BY i.date DESC, i.created_at DESC
            `;
            params = [req.user.id];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ error: 'Failed to fetch inventory', details: error.message });
    }
});

app.post('/api/inventory', verifyToken, async (req, res) => {
    try {
        const { date, product_name, category, stock_in, stock_out, unit, price } = req.body;

        if (!date || !product_name || !category) {
            return res.status(400).json({ error: 'Date, Product Name, and Category are required' });
        }

        const query = `
            INSERT INTO inventory (user_id, date, product_name, category, stock_in, stock_out, unit, price) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [req.user.id, date, product_name, category, stock_in || 0, stock_out || 0, unit || 'kg', price || 0]);
        res.status(201).json({ message: 'Inventory added', id: result.insertId });
    } catch (error) {
        console.error("Error adding inventory:", error);
        res.status(500).json({ error: 'Failed to add inventory', details: error.message });
    }
});

app.put('/api/inventory/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { date, product_name, category, stock_in, stock_out, unit, price } = req.body;

        if (!date || !product_name || !category) {
            return res.status(400).json({ error: 'Date, Product Name, and Category are required' });
        }

        const query = `
            UPDATE inventory 
            SET date=?, product_name=?, category=?, stock_in=?, stock_out=?, unit=?, price=? 
            WHERE id=? AND user_id=?
        `;
        const [result] = await pool.query(query, [date, product_name, category, stock_in || 0, stock_out || 0, unit || 'kg', price || 0, id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory updated successfully' });
    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(500).json({ error: 'Failed to update inventory', details: error.message });
    }
});

app.delete('/api/inventory/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM inventory WHERE id=? AND user_id=?';
        const [result] = await pool.query(query, [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        console.error("Error deleting inventory:", error);
        res.status(500).json({ error: 'Failed to delete inventory', details: error.message });
    }
});

// ================= KHATA API =================
app.get('/api/khata', verifyToken, async (req, res) => {
    try {
        let query;
        let params = [];
        if (req.user.role === 'admin') {
            query = `
                SELECT k.*, u.username as owner_name 
                FROM khata k 
                LEFT JOIN users u ON k.user_id = u.id 
                ORDER BY k.date DESC, k.created_at DESC
            `;
        } else {
            query = `
                SELECT k.*, u.username as owner_name 
                FROM khata k 
                LEFT JOIN users u ON k.user_id = u.id 
                WHERE k.user_id = ? 
                ORDER BY k.date DESC, k.created_at DESC
            `;
            params = [req.user.id];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching khata:", error);
        res.status(500).json({ error: 'Failed to fetch khata', details: error.message });
    }
});

app.post('/api/khata', verifyToken, async (req, res) => {
    try {
        const { date, client_name, notes, debit, credit } = req.body;

        if (!date || !client_name) {
            return res.status(400).json({ error: 'Date and Client Name are required' });
        }

        const query = `
            INSERT INTO khata (user_id, date, client_name, notes, debit, credit) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [req.user.id, date, client_name, notes || '', debit || 0, credit || 0]);
        res.status(201).json({ message: 'Khata added', id: result.insertId });
    } catch (error) {
        console.error("Error adding khata:", error);
        res.status(500).json({ error: 'Failed to add khata', details: error.message });
    }
});

app.put('/api/khata/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { date, client_name, notes, debit, credit } = req.body;

        if (!date || !client_name) {
            return res.status(400).json({ error: 'Date and Client Name are required' });
        }

        const query = `
            UPDATE khata 
            SET date=?, client_name=?, notes=?, debit=?, credit=? 
            WHERE id=? AND user_id=?
        `;
        const [result] = await pool.query(query, [date, client_name, notes || '', debit || 0, credit || 0, id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Khata entry not found' });
        }
        res.json({ message: 'Khata updated successfully' });
    } catch (error) {
        console.error("Error updating khata:", error);
        res.status(500).json({ error: 'Failed to update khata', details: error.message });
    }
});

app.delete('/api/khata/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM khata WHERE id=? AND user_id=?';
        const [result] = await pool.query(query, [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Khata entry not found' });
        }
        res.json({ message: 'Khata entry deleted successfully' });
    } catch (error) {
        console.error("Error deleting khata:", error);
        res.status(500).json({ error: 'Failed to delete khata', details: error.message });
    }
});

// ================= REMINDERS API =================
app.get('/api/reminders', verifyToken, async (req, res) => {
    try {
        let query = 'SELECT * FROM reminders WHERE user_id = ? ORDER BY remind_at ASC';
        let queryParams = [req.user.id];

        // Admin can see all reminders, but let's just keep it to the user's own for now
        // if (req.user.role === 'admin') {
        //     query = 'SELECT r.*, u.username as owner_name FROM reminders r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.remind_at ASC';
        //     queryParams = [];
        // }

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching reminders:", error);
        res.status(500).json({ error: 'Failed to fetch reminders', details: error.message });
    }
});

app.post('/api/reminders', verifyToken, async (req, res) => {
    try {
        const { title, description, remind_at, repeat_type } = req.body;

        if (!title || !remind_at) {
            return res.status(400).json({ error: 'Title and Remind At datetime are required' });
        }

        const query = `
            INSERT INTO reminders (user_id, title, description, remind_at, repeat_type) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [req.user.id, title, description || '', remind_at, repeat_type || 'none']);
        res.status(201).json({ message: 'Reminder created', id: result.insertId });
    } catch (error) {
        console.error("Error creating reminder:", error);
        res.status(500).json({ error: 'Failed to create reminder', details: error.message });
    }
});

app.put('/api/reminders/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, remind_at, repeat_type, is_completed } = req.body;

        if (!title || !remind_at) {
            return res.status(400).json({ error: 'Title and Remind At datetime are required' });
        }

        const query = `
            UPDATE reminders 
            SET title=?, description=?, remind_at=?, repeat_type=?, is_completed=?
            WHERE id=? AND user_id=?
        `;
        const [result] = await pool.query(query, [
            title, description || '', remind_at, repeat_type || 'none', is_completed ? 1 : 0, id, req.user.id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.json({ message: 'Reminder updated successfully' });
    } catch (error) {
        console.error("Error updating reminder:", error);
        res.status(500).json({ error: 'Failed to update reminder', details: error.message });
    }
});

app.delete('/api/reminders/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM reminders WHERE id=? AND user_id=?';
        const [result] = await pool.query(query, [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.json({ message: 'Reminder deleted' });
    } catch (error) {
        console.error("Error deleting reminder:", error);
        res.status(500).json({ error: 'Failed to delete reminder', details: error.message });
    }
});
