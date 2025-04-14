import { getProfile } from '@/action/account';

const profile = async () => {
    return getProfile()
        .then((res) => res.data)
        .catch(() => null);
};

const accountApi = {
    profile
};

export default accountApi;
