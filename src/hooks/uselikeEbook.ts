import { likeEbook, unlikeEbook } from '@/action/ebook';
import { useAudio } from '@/provider/audio/context';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useLikeEbook = (idEbook: string, isLike: boolean = false) => {
    const {
        setAudio,
        audio: { like }
    } = useAudio();
    const router = useRouter();
    const likeBook = useMutation({
        mutationFn: (id: string) => {
            if (like.isLike) return unlikeEbook(id);
            return likeEbook(id);
        },
        onSuccess: () => {
            if (like.isLike) setAudio((prev) => ({ ...prev, like: { ...prev.like, isLike: false } }));
            if (!like.isLike) setAudio((prev) => ({ ...prev, like: { ...prev.like, isLike: true } }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const likeDebounce = useDebouncedCallback((id: string) => {
        if (like.stateLiked !== like.isLike) likeBook.mutate(id);
    }, 500);

    const handleLike = () => {
        setAudio((prev) => ({ ...prev, like: { ...prev.like, stateLiked: !prev.like.stateLiked } }));
        likeDebounce(idEbook);
    };

    useEffect(() => {
        setAudio((prev) => ({
            ...prev,
            like: {
                isLike,
                stateLiked: isLike
            }
        }));
    }, [isLike, setAudio]);
    return { handleLike, like };
};
export default useLikeEbook;
