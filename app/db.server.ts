// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prismaGlobal: PrismaClient;
// }

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prismaGlobal) {
//     global.prismaGlobal = new PrismaClient();
//   }
// }

// const prisma = global.prismaGlobal ?? new PrismaClient();

// export default prisma;


// app/db.server.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  prisma = global.__db;
}

export { prisma };
