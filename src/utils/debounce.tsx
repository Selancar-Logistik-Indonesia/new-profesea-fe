
const debounce = <T extends any[]>(func: (...args: T) => void, delay: number): ((...args: T) => void) => {
    let timer: NodeJS.Timeout | null = null;

    return (...args: T) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func(...args);
            timer = null;
        }, delay);
    };
};

export default debounce;