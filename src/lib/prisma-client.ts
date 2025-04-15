import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
    log: ['query']
});

export const query = async <T>(fn: (pc: PrismaClient) => Promise<T>): Promise<T> => {
    return fn(prismaClient);
};
