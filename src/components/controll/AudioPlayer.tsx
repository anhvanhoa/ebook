'use client';
import Close from './Close';
import InfoEbook from './InfoEbook';
import Controls from './Controls';
import RightControls from './RightControls';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { useAudio } from '@/provider/audio/context';

export default function AudioPlayer() {
    const { audio } = useAudio();
    return (
        <div className='flex flex-col w-full bg-primary-foreground backdrop-blur-md fixed bottom-0 left-0 z-50'>
            <Close />
            <div className='w-full px-4 py-3'>
                <MediaPlayer
                    src={audio.voice?.fileUrl ?? ''}
                    title={audio.ebook?.title}
                    viewType='audio'
                    streamType='on-demand'
                    autoPlay={audio.isPlaying}
                    className='flex items-center justify-between max-w-screen-2xl mx-auto space-x-4'
                >
                    <MediaProvider />
                    <InfoEbook />
                    <Controls />
                    <RightControls />
                </MediaPlayer>
            </div>
        </div>
    );
}
