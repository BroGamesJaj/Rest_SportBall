import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 15; i++) {
    await prisma.player.create({
      data: {
        name: faker.music.artist(),
        goalCount: faker.number.int({ min: 60, max: 150 }),
        birthDate: faker.date.birthdate().toDateString()
      }
    })
  }

  for (let i = 0; i < 10; i++) {
    await prisma.team.create({
      data: {
        country: faker.location.country(),
        players: {
          connect: {
            id: i+1,
          }
        }
      }
    })
  }
  await prisma.team.update({
    where: { id: 2 },
    data: {
      players: {
        connect: [
          { id: 2 },
          { id: 4 },
          { id: 5 },
          { id: 10 },
          { id: 11 },
        ]
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })