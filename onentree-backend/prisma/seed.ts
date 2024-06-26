import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const placeTypes = [
    { name: "Estádio" },
    { name: "Arena" },
    { name: "Teatro" },
    { name: "Auditório" },
  ];

  const eventTypes = [
    { name: "Show" },
    { name: "Futebol" },
  ];

  placeTypes.forEach(async (type) => {
    await prisma.placeType.create({
      data: {
        id: randomUUID(),
        name: type.name
      }
    });
  });

  eventTypes.forEach(async (type) => {
    await prisma.eventType.create({
      data: {
        id: randomUUID(),
        name: type.name
      }
    });
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

