import { usePdf } from '@/provider/pdf/context';
import { useEffect, useRef, useState } from 'react';
type Side = 'left' | 'right';

type Props = {
    onClickLeft?: () => void;
    onClickRight?: () => void;
};

const TimeOut = 250; // Thời gian tối đa giữa các lần click (ms)

export const useTripleClickListener = ({ onClickLeft, onClickRight }: Props = {}) => {
    const [leftClickCount, setLeftClickCount] = useState(0);
    const [rightClickCount, setRightClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [lastSide, setLastSide] = useState<Side | null>(null);
    const handleRightClick = (_: MouseEvent, side: 'left' | 'right') => {
        if (!onClickLeft || !onClickRight) return;
        if (side === 'left') onClickLeft();
        else onClickRight();
    };
    const containerRef = useDoubleRightClick(handleRightClick);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) return; // Chỉ xử lý trong div

            const containerWidth = containerRef.current.offsetWidth;
            const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
            const currentTime = Date.now();
            const timeDiff = currentTime - lastClickTime;
            const currentSide = offsetX < containerWidth / 2 ? 'left' : 'right';

            if (timeDiff > TimeOut || lastSide !== currentSide) {
                setLeftClickCount(currentSide === 'left' ? 1 : 0);
                setRightClickCount(currentSide === 'right' ? 1 : 0);
            } else {
                if (currentSide === 'left') {
                    setLeftClickCount((prev) => prev + 1);
                } else {
                    setRightClickCount((prev) => prev + 1);
                }
            }

            setLastSide(currentSide);
            setLastClickTime(currentTime);

            if (leftClickCount === 2 && currentSide === 'left') {
                onClickLeft?.();
                setLeftClickCount(0);
            }
            if (rightClickCount === 2 && currentSide === 'right') {
                onClickRight?.();
                setRightClickCount(0);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('click', handleClick);

        return () => {
            container?.removeEventListener('click', handleClick);
        };
    }, [leftClickCount, rightClickCount, lastClickTime, lastSide, onClickLeft, onClickRight, containerRef]);

    return containerRef;
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

type DoubleRightClickCallback = (event: MouseEvent, side: 'left' | 'right') => void;

export const useDoubleRightClick = (callback: DoubleRightClickCallback, delay: number = 300) => {
    const rightClickCount = useRef<number>(0);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null); // Ref đến thẻ div

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) return; // Chỉ xử lý trong div

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

                // Xác định nửa thẻ `div`: trái hay phải
                const containerWidth = containerRef.current.offsetWidth;
                const offsetX = event.clientX - containerRef.current.getBoundingClientRect().left;
                const side = offsetX < containerWidth / 2 ? 'left' : 'right';

                callback(event, side);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('contextmenu', handleContextMenu);

        return () => {
            container?.removeEventListener('contextmenu', handleContextMenu);
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [callback, delay]);

    return containerRef;
};

export const useResize = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('resize', callback);
        };
    }, [callback]);
};

export const useControll = () => {
    const pdf = usePdf();
    const handleNext = () => {
        if (pdf.state.viewMode === 'double') {
            if (pdf.state.pageNumber + 1 >= pdf.state.totalPages) return;
            pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber + 2 });
            return;
        }
        if (pdf.state.pageNumber >= pdf.state.totalPages) return;
        pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber + 1 });
    };
    const handlePrev = () => {
        if (pdf.state.pageNumber === 1) return;
        if (pdf.state.viewMode === 'double') {
            pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber - 2 });
            return;
        }
        pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber - 1 });
    };
    return { handleNext, handlePrev };
};
