import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash("demo1234", 10);

    const user = await prisma.user.upsert({
        where: { email: "demo@example.com" },
        update: {},
        create: {
            name: "Usuario Demo",
            email: "demo@example.com",
            password: passwordHash,
        },
    });

    console.log("Usuario creado:", user.email);

    // Crear checkups demo
    const checkups = await prisma.checkup.createMany({
        data: [
            {
                userId: user.id,
                notes: "Sin molestias, todo normal",
                pain: false,
                lumpDetected: false,
                asymmetry: false,
            },
            {
                userId: user.id,
                notes: "Ligera molestia en el lado izquierdo",
                pain: true,
                lumpDetected: false,
                asymmetry: false,
            },
            {
                userId: user.id,
                notes: "Pequeño bulto detectado",
                pain: false,
                lumpDetected: true,
                asymmetry: true,
            },
        ],
    });

    console.log("Checkups creados:", checkups);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
