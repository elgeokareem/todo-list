import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "elkareem123@gmail.com",
      tasks: {
        create: [{ title: "Task 1" }, { title: "Task 2" }]
      }
    }
  });

  console.log("Seeded!");

  const allUsers = await prisma.user.findMany({});

  console.dir(allUsers, { depth: null });
}

main().then(() => {
  console.log("Finished!");
});

export default main;
