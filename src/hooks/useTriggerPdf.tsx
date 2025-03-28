import { useEffect, useRef, useState } from 'react';

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

type PropsZoom = {
    onMouseUp?: () => void;
    onMouseDown?: () => void;
};

export const useZoom = ({ onMouseDown, onMouseUp }: PropsZoom = {}) => {
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
                if (e.deltaY < 0 && onMouseUp) {
                    onMouseUp();
                } else if (e.deltaY > 0 && onMouseDown) {
                    onMouseDown();
                }
            }
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    });
};

type DoubleRightClickCallback = (event: MouseEvent, side: "left" | "right") => void;

export const useDoubleRightClick = (callback: DoubleRightClickCallback, delay: number = 300) => {
    const rightClickCount = useRef<number>(0);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault(); // Chặn menu chuột phải mặc định
            rightClickCount.current++;

            if (rightClickCount.current === 1) {
                timer.current = setTimeout(() => {
                    rightClickCount.current = 0; // Reset nếu không double click
                }, delay);
            } else if (rightClickCount.current === 2) {
                if (timer.current) {
                    clearTimeout(timer.current);
                }
                rightClickCount.current = 0;

                // Xác định nửa màn hình: trái hay phải
                const screenWidth = window.innerWidth;
                const side = event.clientX < screenWidth / 2 ? "left" : "right";

                callback(event, side);
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [callback, delay]);

    return null;
};

export const useResize = (callback: (ev: UIEvent) => void) => {
    useEffect(() => {
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('resize', callback);
        };
    }, [callback]);
}
