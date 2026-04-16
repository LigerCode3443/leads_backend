# Leads Backend

1. 🚀 Quick Start

### 1. Database (Docker)
Ensure your `docker-compose.yml` is ready, then run:
```bash
docker-compose up -d

2. Create a .env file and paste your config:

# Application Configuration
PORT=5001

# Database Configuration
POSTGRES_USER=root
POSTGRES_PASSWORD=your_secure_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=leads_db

# Prisma Connection String
POSTGRES_URL="postgresql://root:12345678@localhost:5433/leads_db?schema=public"

3. Prisma Setup

npx prisma generate
npx prisma migrate dev --name init


Run App:

npm run start:dev

4. Links:
 - API URL: http://localhost:5001

 - Swagger Docs: http://localhost:5001/doc

 - Database GUI: npx prisma studio (Run this to see your data in a browser)