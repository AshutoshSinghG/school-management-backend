# School Management API

REST API for managing school data with proximity-based listing. Built with Node.js, Express.js, and MySQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit

## Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+

### 1. Clone & Install

```bash
git clone <repository-url>
cd school-management-api
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

### 3. Create Database

```sql
CREATE DATABASE school_management;
```

The `schools` table is created automatically on server startup.

### 4. Run

```bash
# Development
npm run dev

# Production
npm start
```

Server starts at `http://localhost:3000`.

## API Endpoints

### Health Check

```
GET /api/health
```

### Add School

```
POST /api/addSchool
Content-Type: application/json

{
  "name": "Delhi Public School",
  "address": "Sector 24, Mathura Road, New Delhi",
  "latitude": 28.5672,
  "longitude": 77.2410
}
```

**Response** (201):

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 24, Mathura Road, New Delhi",
    "latitude": 28.5672,
    "longitude": 77.241,
    "created_at": "2026-03-07T00:00:00.000Z",
    "updated_at": "2026-03-07T00:00:00.000Z"
  }
}
```

### List Schools (sorted by proximity)

```
GET /api/listSchools?latitude=28.6139&longitude=77.2090
```

**Response** (200):

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 24, Mathura Road, New Delhi",
      "latitude": 28.5672,
      "longitude": 77.241,
      "distance_km": 5.91
    }
  ]
}
```

## Error Handling

All errors return consistent JSON:

```json
{
  "success": false,
  "status": "fail",
  "message": "Descriptive error message"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Validation error |
| 404 | Route not found |
| 409 | Duplicate entry |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

## Project Structure

```
├── server.js                  # Entry point
├── src/
│   ├── app.js                 # Express app setup
│   ├── config/
│   │   ├── db.js              # MySQL connection pool
│   │   └── env.js             # Environment config
│   ├── controllers/
│   │   └── schoolController.js
│   ├── database/
│   │   └── migrate.js         # Table creation
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   └── schoolValidator.js # Input validation
│   ├── routes/
│   │   ├── index.js           # Route aggregator
│   │   └── schoolRoutes.js
│   └── utils/
│       ├── AppError.js        # Custom error class
│       └── distance.js        # Haversine formula
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── School_Management_API.postman_collection.json
```

## Deployment

### Railway / Render

1. Push code to GitHub
2. Connect repo to Railway or Render
3. Set environment variables in the dashboard
4. Deploy — the server auto-runs migrations on boot

### Manual (VPS)

```bash
npm install --production
NODE_ENV=production node server.js
```

Use PM2 for process management:

```bash
pm2 start server.js --name school-api
```

## Postman Collection

Import `School_Management_API.postman_collection.json` into Postman. Set `baseUrl` variable to your deployed URL.

## License

ISC
