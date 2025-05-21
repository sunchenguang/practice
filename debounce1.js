function debounce1(func, time) {
    let timer

    return function (...args) {
        clearTimeout(timer)

        timer = setTimeout(function () {
            func.apply(this, args)
        }, time)
    }
}

function throttle(func, time) {
    let inThrottle = false;

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
