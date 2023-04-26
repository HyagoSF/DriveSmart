import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
const client = globalThis.prisma || new PrismaClient();
// Prevent multiple instances of Prisma Client in production
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// Prisma Client is now available from anywhere!
export default client;
