const SingleInstance = (function () {
    let instance;

    function createInstance() {
        return {};
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance()
            }

            return instance
        }
    }


})()
