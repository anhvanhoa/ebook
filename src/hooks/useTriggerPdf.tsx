import { useEffect, useState } from 'react';

type Side = 'left' | 'right';

type Props = {
    onClickLeft?: () => void;
    onClickRight?: () => void;
};

const TimeOut = 250;
export const useTripleClickListener = ({ onClickLeft, onClickRight }: Props = {}) => {
    const [leftClickCount, setLeftClickCount] = useState(0);
    const [rightClickCount, setRightClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [lastSide, setLastSide] = useState<Side | null>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const screenWidth = window.innerWidth;
            const currentTime = Date.now();
            const timeDiff = currentTime - lastClickTime;
            const currentSide = e.clientX < screenWidth / 2 ? 'left' : 'right';

            if (timeDiff > TimeOut || lastSide !== currentSide) {
                // Nếu đổi bên hoặc quá thời gian, reset cả hai và bắt đầu lại
                setLeftClickCount(currentSide === 'left' ? 1 : 0);
                setRightClickCount(currentSide === 'right' ? 1 : 0);
            } else {
                // Nếu cùng bên, tăng đếm cho bên đó
                if (currentSide === 'left') {
                    setLeftClickCount((prev) => prev + 1);
                } else {
                    setRightClickCount((prev) => prev + 1);
                }
            }

            setLastSide(currentSide);
            setLastClickTime(currentTime);

            if (leftClickCount === 2 && currentSide === 'left') {
                if (onClickLeft) {
                    onClickLeft();
                }
                setLeftClickCount(0);
            }
            if (rightClickCount === 2 && currentSide === 'right') {
                if (onClickRight) {
                    onClickRight();
                }
                setRightClickCount(0);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [leftClickCount, rightClickCount, lastClickTime, lastSide, onClickLeft, onClickRight]);
};

export const useArrowKeyListener = ({ onClickLeft, onClickRight }: Props = {}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && onClickLeft) {
                onClickLeft();
            }
            if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && onClickRight) {
                onClickRight();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClickLeft, onClickRight]);
};
