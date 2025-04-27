import React, { useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { formatTime, Time, useMediaRemote, useMediaState, useSliderPreview } from '@vidstack/react';
const SliderTime = () => {
    const time = useMediaState('currentTime');
    const canSeek = useMediaState('canSeek');
    const duration = useMediaState('duration');
    const seeking = useMediaState('seeking');
    const remote = useMediaRemote();
    const step = (1 / duration) * 100;
    const [value, setValue] = React.useState(0);
    const { previewRootRef, previewValue, previewRef } = useSliderPreview({
        clamp: true,
        offset: 6,
        orientation: 'horizontal'
    });
    const previewTime = useMemo(() => (previewValue / 100) * duration, [previewValue, duration]);
    // Keep slider value in-sync with playback.
    React.useEffect(() => {
        if (seeking) return;
        setValue((time / duration) * 100);
    }, [time, duration, seeking]);
    return (
        <div className='flex items-center gap-2 w-full'>
            <Time className='text-xs text-neutral-600 w-10 text-right' type='current' />
            <div className='flex-1 relative'>
                <Slider
                    value={[duration ? value : 1]}
                    disabled={!canSeek}
                    step={Number.isFinite(step) ? step : 1}
                    ref={previewRootRef}
                    max={duration ? undefined : 1}
                    className='cursor-pointer py-1'
                    onValueChange={([value]) => {
                        setValue(value);
                        remote.seeking((value / 100) * duration);
                    }}
                    onValueCommit={([value]) => {
                        remote.seek((value / 100) * duration);
                    }}
                />
                <div
                    className='flex flex-col items-center absolute opacity-0 data-[visible]:opacity-100 transition-opacity duration-200 will-change-[left] pointer-events-none'
                    ref={previewRef}
                >
                    <span className='text-xs text-primary bg-primary-foreground px-1.5 shadow-2xl border py-0.5 rounded-md'>{formatTime(previewTime)}</span>
                </div>
            </div>
            <Time className='text-xs text-neutral-600 w-10' type='duration' />
        </div>
    );
};

export default SliderTime;
