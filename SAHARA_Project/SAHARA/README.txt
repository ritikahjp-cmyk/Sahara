SAHARA PROJECT
==============================

1. Install Node.js and MySQL.
2. Open the backend folder in VS Code terminal.
3. Run: npm install
4. Create database by running database.sql in MySQL Workbench.
5. Copy backend/.env.example to backend/.env
6. Put your MySQL password in .env.
7. Run: npm start
8. Open: http://localhost:5000

Folder structure:
SAHARA/
  frontend/
    index.html
    style.css
    script.js
  backend/
    server.js
    db.js
    package.json
    .env.example
  database.sql

IMPORTANT:
The SafeNote in this starter project uses browser localStorage and is not suitable for storing highly sensitive information. A production system should use authenticated, encrypted, access-controlled storage.
