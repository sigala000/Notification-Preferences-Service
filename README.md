# Notification Service (Senior Version)

## Stack
Node.js + TypeScript + PostgreSQL + Prisma

## Setup
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

## Test
npm test

## Architecture
- Domain rule engine (evaluate)
- Prisma repository layer
- Global policy + user prefs + quiet hours
- Idempotent upserts via composite keys
