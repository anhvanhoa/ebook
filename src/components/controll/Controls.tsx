'use client';
import Play from './Play';
import SliderTime from './SliderTime';
import Speed from './Speed';
import ModePlay from './ModePlay';

const Controls = () => {
    return (
        <div className='flex items-center gap-3 flex-1 mx-6'>
            <ModePlay />
            <Play />
            <Speed />
            <SliderTime />
        </div>
    );
};

export default Controls;
