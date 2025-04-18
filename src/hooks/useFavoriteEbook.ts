import { addFavorite, removeFavorite } from '@/action/account';
import { useSetAudio } from '@/provider/audio/context';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useFavoriteEbook = (idEbook: string, favorite?: boolean) => {
    const router = useRouter();
    const setAudio = useSetAudio();
    const [state, setState] = React.useState({
        favorite: favorite,
        stateFavorite: favorite
    });
    const favoriteBook = useMutation({
        mutationFn: (id: string) => {
            if (state.favorite) return removeFavorite(id);
            return addFavorite(id);
        },
        onSuccess: () => {
            if (state.favorite) setState((prev) => ({ ...prev, favorite: false }));
            if (!state.favorite) setState((prev) => ({ ...prev, favorite: true }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const favoriteDebounce = useDebouncedCallback((id: string) => {
        if (state.stateFavorite !== state.favorite) favoriteBook.mutate(id);
    }, 500);

    const handleFavorite = () => {
        setState((prev) => ({ ...prev, stateFavorite: !prev.stateFavorite }));
        setAudio((prev) => {
            const ebook = prev.ebook ? { ...prev.ebook, isFavorite: !prev.ebook?.isFavorite } : undefined;
            return {
                ...prev,
                ebook: ebook
            };
        });
        favoriteDebounce(idEbook);
    };

    return { handleFavorite, ...state };
};

export default useFavoriteEbook;
