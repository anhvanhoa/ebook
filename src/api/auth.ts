import { verifyHandle } from '@/action/auth';

const verifyHandleApi = async (t: string) => {
    return verifyHandle(t)
        .then((res) => {
            return res;
        })
        .catch(() => {
            return null;
        });
};

const authApi = {
    verifyHandleApi
};

export default authApi;
