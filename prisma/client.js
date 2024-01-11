import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare the global variable 'prisma'
globalThis.prisma = undefined;

// Initialize 'prisma' with the result of 'prismaClientSingleton' if not already set
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Export 'prisma' as the default export
// module.exports = prisma;
export default prisma

// Set 'prisma' in the global scope if not in production
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}