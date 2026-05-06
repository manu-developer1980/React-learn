import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "test@test.com";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const password = await bcrypt.hash("123456", 10);
    await prisma.user.create({
      data: { email, password, name: "Tester" },
    });
  }
}

main()
  .catch(() => process.exit(1))
  .finally(async () => {
    await prisma.$disconnect();
  });
