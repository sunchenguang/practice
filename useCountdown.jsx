import { useState } from 'react';

export default function useCountdown(initialCount) {
    const [count, setCount] = useState(initialCount);
    
    useEffect(() => {
        if (count === 0) return;
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);    

    return [count, setCount];       
}   
