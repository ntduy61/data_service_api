# 🧩 DATA_SERVICE_API

A dynamic Node.js + Express backend designed to handle **stored procedure calls** and **file uploads** in a unified way.  
Supports multiple databases (MySQL, MSSQL, PostgreSQL, Oracle) via a flexible service factory.

---

## 🚀 Features

- ✅ Unified data API — call any stored procedure dynamically  
- 🗄 Supports MySQL, MSSQL, PostgreSQL, Oracle  
- 📁 File upload & download (via `/api/file`)  
- 🔐 Middleware-based authentication  
- 🧠 Centralized logging and error handling  
- 🪄 Simple `.env` configuration  
- 🧩 Modular folder structure for easy maintenance  

---

## 📂 Project Structure

```
DATA_SERVICE_API/
├── db/
│   ├── dbFactory.js          # Database factory (switch by type)
│   ├── mssqlService.js       # SQL Server implementation
│   ├── mysqlService.js       # MySQL implementation
│   ├── oracleService.js      # Oracle implementation
│   └── pgService.js          # PostgreSQL implementation
│
├── logs/                     # Request and error logs
├── middlewares/
│   └── auth.js               # Authentication middleware
│
├── routes/
│   ├── dataService.js        # Core dynamic data API route
│   └── fileService.js        # File upload/download route
│
├── uploads/                  # Uploaded files (by folder)
├── utils/
│   └── logger.js             # Logging utility
│
├── .env                      # Environment configuration
├── app.js                    # Express server setup
├── package.json              # Dependencies & scripts
└── README.md                 # Project documentation
```

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/DATA_SERVICE_API.git

# Navigate to project folder
cd DATA_SERVICE_API

# Install dependencies
npm install

# Run the server (development)
npm start
```

---

## 🧾 Environment Variables

Example `.env` file:

```
PORT=3000
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=123456
DB_NAME=my_database
UPLOAD_PATH=uploads
LOG_PATH=logs
JWT_SECRET=your_secret_key
```

---

## 🔗 API Endpoints

### 1️⃣ Dynamic Data Service
#### **POST** `/api/data/dataService?call=sp_user_by_id_s_1`

```json
{
  "iID": 1
}
```

- `call` parameter format: `sp_{table}_{operation}_{version}`
- Example:  
  - `sp_user_s_1` → select users  
  - `sp_user_i_1` → insert user  
  - `sp_user_iu_1` → insert or update user  
- Supports multiple recordsets and output parameters  
- Standard output:  
  - `@iRETURN_CD`
  - `@iRETURN_MSG`
  - `@iLANG`

---

### 2️⃣ File Upload
#### **POST** `/api/file/upload/:folder`

Upload a file to a specific folder.

**Example:**
```
POST http://localhost:3000/api/file/upload/avatars
```

Form-data:
```
file: <your_file>
```

---

### 3️⃣ File Download
#### **GET** `/api/file/get/:folder/:filename`

Example:
```
GET http://localhost:3000/api/file/get/avatars/profile.png
```

---

## 🧰 Scripts

| Command | Description |
|----------|--------------|
| `npm start` | Start the server |
| `npm run dev` | Start with nodemon (if configured) |
| `npm test` | Run tests (if added) |

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **Multer** (file upload)
- **Winston** (logging)
- **dotenv**
- **JWT** (authentication)
- **MySQL / MSSQL / PostgreSQL / Oracle**

---

## 🧑‍💻 Author

**Duy** – Full-stack Developer  
🔗 [GitHub](https://github.com/ntduy61)

---

## 🪪 License

This project is licensed under the **MIT License**.
