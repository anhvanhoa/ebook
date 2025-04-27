import { EbookInterface, useAudio } from '@/provider/audio/context';
import { Voice } from '@prisma/client';

const useVoiceEbook = (ebook: EbookInterface) => {
    const audio = useAudio();
    const handleVoice = (voice: Voice) => {
        audio.setAudio((prev) => ({
            ...prev,
            ebook: {
                ...prev.ebook,
                ...ebook,
            },
            voice,
            isShowPlayer: true,
            isPlaying: true,
        }));
    };
    return handleVoice;
};

export default useVoiceEbook;
