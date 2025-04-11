export const newResponse = (status: number, message: string, data: any) => {
    return {
        status,
        message,
        data
    };
};
