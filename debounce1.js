function debounce1(func, time) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(function () {
            func.apply(this, args);
        }, time);
    };
}

function throttle(func, time) {
    let inThrottle = false;

    return function (...args) {
        if (!inThrottle) {
            inThrottle = true;
            func.apply(this, args);
            setTimeout(() => {
                inThrottle = false;
            }, time);
        }
    };
}

function throttle2(func, time) {
    let lastTime = 0;
    let timer;


    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= time) {
            lastTime = now;
            func.apply(this, args);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
                lastTime = now;
            }, time);
        }
    };
}



