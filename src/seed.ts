import { createEvents } from './db/createEvents';
import { createParticipants } from './db/createParticipants';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await createEvents();
  await createParticipants();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });