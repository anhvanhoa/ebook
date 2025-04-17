import { followEbook, unfollowEbook } from '@/action/ebook';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useFollowEbook = (idEbook: string, followed?: boolean) => {
    const router = useRouter();
    const [state, setState] = React.useState({
        followed: followed,
        stateFollow: followed
    });
    const followBook = useMutation({
        mutationFn: (id: string) => {
            if (state.followed) return unfollowEbook(id);
            return followEbook(id);
        },
        onSuccess: () => {
            if (state.followed) setState((prev) => ({ ...prev, followed: false }));
            if (!state.followed) setState((prev) => ({ ...prev, followed: true }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });
    const followDebounce = useDebouncedCallback((id: string) => {
        if (state.stateFollow !== state.followed) followBook.mutate(id);
    }, 500);
    const handleFollow = () => {
        setState((prev) => ({ ...prev, stateFollow: !prev.stateFollow }));
        followDebounce(idEbook);
    };
    return {
        handleFollow,
        ...state
    };
};

export default useFollowEbook;
