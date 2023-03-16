import { PrismaClient } from "@prisma/client";

const prisma = {
  prisma: new PrismaClient(),
};

export default prisma;
