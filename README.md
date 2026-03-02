# Khan Traders Jauwana Bangla - Shop App

A bilingual (English / Urdu) Single Page Application designed for tracking daily shop transactions, inventory management, and Khata (client ledgers).

## Features
- **Dynamic Language Toggle**: Switch the entire interface between English and Urdu instantly.
- **Daybook**: Track incoming and outgoing transactions.
- **Inventory Management**: Track stock in/stock out for specific products.
- **Khata Details**: Maintain debit and credit records for individual clients.
- **Print & Export**: Clean interface for generating invoices securely.
- **Database Backed**: Powered by a robust Node.js and MySQL backend.

## Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (SPA Routing, DOM Manipulation), Custom CSS Variables.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL.

## Local Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd "Khan Traders Jauwana Bangla"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Database**:
   Ensure XAMPP or your local MySQL server is running. Create a `.env` file in the root directory and add your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=khantraders_jauwana
   PORT=5000
   ```

4. **Start the Server**:
   The required database tables (`transactions`, `inventory`, `khata`) will be automatically created on the first successful connection.
   ```bash
   npm start
   ```

5. **View Application**:
   Open `index.html` directly in your browser or run a live server on the directory to interact with the API interface.
