import { addFavorite, removeFavorite } from '@/action/account';
import { useAudio } from '@/provider/audio/context';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useFavoriteEbook = (idEbook: string, isFavorite: boolean = false) => {
    const router = useRouter();
    const {
        setAudio,
        audio: { favorite }
    } = useAudio();

    const favoriteBook = useMutation({
        mutationFn: (id: string) => {
            if (favorite?.isFavorite) return removeFavorite(id);
            return addFavorite(id);
        },
        onSuccess: () => {
            if (favorite?.isFavorite) {
                setAudio((prev) => ({ ...prev, stateFavorite: { ...prev.favorite, isFavorite: false } }));
            }
            if (!favorite?.isFavorite) {
                setAudio((prev) => ({ ...prev, stateFavorite: { ...prev.favorite, isFavorite: true } }));
            }
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const favoriteDebounce = useDebouncedCallback((id: string) => {
        if (favorite?.stateFavorite !== favorite?.isFavorite) favoriteBook.mutate(id);
    }, 500);

    const handleFavorite = () => {
        setAudio((prev) => {
            return {
                ...prev,
                favorite: {
                    ...prev.favorite,
                    stateFavorite: !prev.favorite.stateFavorite
                }
            };
        });
        favoriteDebounce(idEbook);
    };

    useEffect(() => {
        setAudio((prev) => ({
            ...prev,
            favorite: {
                isFavorite,
                stateFavorite: isFavorite
            }
        }));
    }, [isFavorite, setAudio]);

    return { handleFavorite, favorite };
};

export default useFavoriteEbook;
