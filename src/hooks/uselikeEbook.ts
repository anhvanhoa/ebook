import { likeEbook, unlikeEbook } from '@/action/ebook';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useLikeEbook = (idEbook: string, liked?: boolean) => {
    const [state, setState] = React.useState({
        liked: liked,
        stateLike: liked
    });
    const router = useRouter();
    const likeBook = useMutation({
        mutationFn: (id: string) => {
            if (state.liked) return unlikeEbook(id);
            return likeEbook(id);
        },
        onSuccess: () => {
            if (state.liked) setState((prev) => ({ ...prev, liked: false }));
            if (!state.liked) setState((prev) => ({ ...prev, liked: true }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const likeDebounce = useDebouncedCallback((id: string) => {
        if (state.stateLike !== state.liked) likeBook.mutate(id);
    }, 500);

    const handleLike = () => {
        setState((prev) => ({ ...prev, stateLike: !prev.stateLike }));
        likeDebounce(idEbook);
    };

    return { handleLike, ...state };
};
export default useLikeEbook;
