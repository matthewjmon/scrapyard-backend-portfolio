# Scrapyard Registration API (Portfolio)

Express + MongoDB API for a scrapyard acquisition register demo app.

## Live Links
- API Base URL: `https://scrapyard-backend-portfolio.onrender.com/api`
- Frontend App: `https://scrapyard-frontend-portfolio.onrender.com`
- Backend Repo: `https://github.com/matthewjmon/scrapyard-backend-portfolio`
- Frontend Repo: `https://github.com/matthewjmon/scrapyard-frontend-portfolio`

## Project Impact
This portfolio project is a sanitized adaptation of a real, paid, and deployed business application developed for a local scrapyard operation.

### Business Problem
- Manual, paper-heavy registration created slow intake at busy periods.
- Inconsistent capture workflows caused duplicate entries and incomplete records.
- Operational traceability and reporting were difficult across historical transactions.

### Solution Delivered
- Built a secure API-driven registration workflow with authenticated access.
- Standardized record creation with sequential acquisition codes and validation rules.
- Enabled fast retrieval/editing/printing of records for day-to-day operations.

### Operational Outcomes
- Faster customer intake and reduced registration turnaround time.
- Fewer duplicate and inconsistent entries due to structured input and validation.
- Improved auditability and day-to-day visibility of acquisition records.

Note: This repository is intentionally sanitized for portfolio use and contains no production data or production secrets.

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT auth

## Key Features
- Login with JWT (`/api/auth/login`)
- Protected CRUD routes for registration records
- Sequential record code generation (`ACQ-001`, `ACQ-002`, ...)
- Editable business name per logged-in user
- Seed scripts for demo data
- Safety guard to block non-demo DB names

## Project Structure
```txt
models/        Mongoose models
routes/        API route handlers
middleware/    Auth middleware
seeds/         Demo data seeding
utils/         Safety validators
server.js      API entry point
```

## Environment Variables
Create `.env`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/scrapyard_portfolio_demo?retryWrites=true&w=majority
PORT=5001
JWT_SECRET=<long-random-secret>
CLIENT_URL=http://localhost:5173
```

Notes:
- DB name must include `portfolio` or `demo` (enforced at startup).
- Use a MongoDB user scoped to demo DB only.

## Local Setup
```bash
npm install
npm run create-user
npm run seed
npm run dev
```

## Scripts
- `npm run dev` start with nodemon
- `npm run start` start production server
- `npm run create-user` create demo login user
- `npm run seed` seed demo records

## API Endpoints
- `POST /api/auth/login`
- `GET /api/records`
- `GET /api/records/:id`
- `POST /api/records`
- `PUT /api/records/:id`
- `DELETE /api/records/:id`
- `DELETE /api/records`
- `GET /api/records/next-code`
- `PUT /api/profile/business-name`

All `/api/records/*` and `/api/profile/*` routes require `Authorization: Bearer <token>`.

## Deploy on Render
1. Create a new Web Service from this repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
5. Set `CLIENT_URL` to your deployed frontend URL.

## Portfolio Notes
- This codebase is sanitized for demo use and does not include production credentials.
- Demo account setup is script-based (`npm run create-user`) for recruiter testing.
