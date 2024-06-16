import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.role.create({
        data:{
            
            name:"admin",
            createdAt:new Date(),
            updatedAt:new Date(),
            isDeleted:false
        }
    })
    await prisma.producto.create({
        data:{
            nombre:"solPanel",
            descripcion:"Deteccion de fallas en un sistema de paneles solares",
            stock:10,
            precio:122,
            createdAt:new Date(),
            updatedAt:new Date(),
            isDeleted:false
        }
    })
    await prisma.specifProduct.createMany({
        data:[{
            codigo:"123derg4ff4r4r",
            productoId:1,
            isDeleted:false,
            createdAt:new Date(),
            updatedAt:new Date(),
            createdBy:1,
            updatedBy:1
        },
        {
            codigo:"124frfs44f",
            productoId:1,
            isDeleted:false,
            createdAt:new Date(),
            updatedAt:new Date(),
            createdBy:1,
            updatedBy:1
        }, {
            codigo:"124dededfefef",
            productoId:1,
            isDeleted:false,
            createdAt:new Date(),
            updatedAt:new Date(),
            createdBy:1,
            updatedBy:1
        },

       
    ]
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