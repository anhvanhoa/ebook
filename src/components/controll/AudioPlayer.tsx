'use client';
import Close from './Close';
import InfoEbook from './InfoEbook';
import Controls from './Controls';
import RightControls from './RightControls';

export default function AudioPlayer() {
    // const formatTime = (seconds: number) => {
    //     const mins = Math.floor(seconds / 60);
    //     const secs = Math.floor(seconds % 60);
    //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    // };
    return (
        <div className='flex flex-col w-full bg-primary-foreground/20 backdrop-blur-md fixed bottom-0 left-0 z-50 border-t'>
            <Close />
            <div className='w-full px-4 py-3'>
                <div className='flex items-center justify-between max-w-screen-2xl mx-auto'>
                    <InfoEbook />
                    <Controls />
                    <RightControls />
                </div>
            </div>
        </div>
    );
}
