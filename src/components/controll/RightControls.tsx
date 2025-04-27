import React, { useMemo } from 'react';
import { Volume2, Volume1, VolumeX, Heart, ThumbsUp, UserPlus, Link2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useMediaRemote, useMediaState } from '@vidstack/react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import useFavoriteEbook from '@/hooks/useFavoriteEbook';
import { useAudio } from '@/provider/audio/context';
import useLikeEbook from '@/hooks/uselikeEbook';
import useFollowEbook from '@/hooks/useFollowEbook';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
    ssr: false
});

const RightControls = () => {
    const volume = useMediaState('volume');
    const muted = useMediaState('muted');
    const canSetVolume = useMediaState('canSetVolume');
    const remote = useMediaRemote();
    const handleVolumeChange = (value: number) => {
        if (remote) {
            remote.changeVolume(value / 100);
        }
    };
    const vol = useMemo(() => volume * 100, [volume]);
    const handleVolume = () => {
        if (remote) {
            remote.toggleMuted();
        }
    };
    const { audio } = useAudio();
    const { handleFavorite, favorite } = useFavoriteEbook(audio.ebook?.id as string, audio.favorite?.isFavorite);
    const { like, handleLike } = useLikeEbook(audio.ebook?.id as string, audio.like?.isLike);
    const { follow, handleFollow } = useFollowEbook(audio.ebook?.id as string, audio.follow?.isFollow);
    const path = usePathname();
    const handleCopyLink = () => {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}${path}`);
            toast("Sao chép liên kết thành công", {
                position: 'top-right',
            })
        }
    }
    return (
        <div className='flex items-center gap-3'>
            <div className='space-x-2'>
                <Button onClick={handleFavorite} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <Heart
                        className={cn('fill-current', { 'fill-rose-500 stroke-rose-500': favorite.stateFavorite })}
                    />
                </Button>
                <Button onClick={handleLike} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <ThumbsUp className={cn({ 'stroke-rose-500': like.stateLiked })} />
                </Button>
                <Button onClick={handleFollow} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <UserPlus className={cn({ 'stroke-rose-500': follow.stateFollowed })} />
                </Button>
                <Button onClick={handleCopyLink} variant={'ghost'} className='size-8 !p-1 group cursor-pointer active:text-primary'>
                    <Link2 />
                </Button>
            </div>
            <div className='flex items-center gap-2 w-32'>
                <Button onClick={handleVolume} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    {!muted && vol >= 50 && <Volume2 />}
                    {!muted && vol < 50 && vol >= 1 && <Volume1 />}
                    {(muted || vol === 0) && <VolumeX />}
                </Button>
                <Slider
                    disabled={!canSetVolume}
                    value={[vol]}
                    step={1}
                    className='cursor-pointer'
                    onValueChange={(value) => handleVolumeChange(value[0])}
                />
            </div>
        </div>
    );
};

export default RightControls;
