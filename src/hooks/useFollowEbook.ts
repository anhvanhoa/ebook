import { followEbook, unfollowEbook } from '@/action/ebook';
import { useAudio } from '@/provider/audio/context';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useFollowEbook = (idEbook: string, idFollow: boolean = false) => {
    const router = useRouter();
    const {
        setAudio,
        audio: { follow }
    } = useAudio();
    const followBook = useMutation({
        mutationFn: (id: string) => {
            if (follow.isFollow) return unfollowEbook(id);
            return followEbook(id);
        },
        onSuccess: () => {
            if (follow.isFollow) setAudio((prev) => ({ ...prev, follow: { ...prev.follow, isFollow: false } }));
            if (!follow.isFollow) setAudio((prev) => ({ ...prev, follow: { ...prev.follow, isFollow: true } }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });
    const followDebounce = useDebouncedCallback((id: string) => {
        if (follow.stateFollowed !== follow.isFollow) followBook.mutate(id);
    }, 500);
    const handleFollow = () => {
        setAudio((prev) => ({ ...prev, follow: { ...prev.follow, stateFollowed: !prev.follow.stateFollowed } }));
        followDebounce(idEbook);
    };
    useEffect(() => {
        setAudio((prev) => ({
            ...prev,
            follow: {
                isFollow: idFollow,
                stateFollowed: idFollow
            }
        }));
    }, [idFollow, setAudio]);
    return {
        handleFollow,
        follow
    };
};

export default useFollowEbook;
