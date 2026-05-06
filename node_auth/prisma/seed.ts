import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: "Telescopio Celestron EdgeHD 8", price: 1400, type: "OTA" },
  {
    name: "Cámara ZWO ASI2600MM Pro",
    price: 2500,
    type: "Cámara Dedicada",
  },
  {
    name: "Montura Sky-Watcher EQ6-R Pro",
    price: 1650,
    type: "Montura Ecuatorial",
  },
  {
    name: 'Filtro Optolong L-Ultimate 2"',
    price: 320,
    type: "Filtro Banda Estrecha",
  },
  { name: "Guiado ZWO ASI120MM Mini", price: 160, type: "Cámara Guía" },
]

async function main() {
  console.log('🌱 Empezando el seeding...')
  
  // Opcional: Borrar datos anteriores para no duplicar
  // await prisma.product.deleteMany()

  for (const product of products) {
    const p = await prisma.product.create({
      data: product,
    })
    console.log(`Created product with id: ${p.id}`)
  }

  console.log('🌱 Seeding finalizado.')
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