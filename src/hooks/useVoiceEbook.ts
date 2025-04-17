import { useAudio } from '@/provider/audio/context';
import { Voice } from '@prisma/client';

const useVoiceEbook = (slugEbook: string) => {
    const audio = useAudio();
    const handleVoice = (voice: Voice) => {
        audio.setAudio((prev) => ({
            ...prev,
            voice,
            isShowPlayer: true,
            isPlaying: true,
            slugEbook
        }));
    };
    return handleVoice;
};

export default useVoiceEbook;
