function throttle1(func, time) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            inThrottle = true;
            func.apply(this, args);
            setTimeout(() => {
                inThrottle = false;
            }, time)
        }

    }

}

