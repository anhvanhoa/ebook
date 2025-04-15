import { PrismaClient } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"

const prismaClient = new PrismaClient({
    log: ['query']
}).$extends(withAccelerate());

export const query = async <T>(fn: (pc: typeof prismaClient) => Promise<T>): Promise<T> => {
    return fn(prismaClient);
};
