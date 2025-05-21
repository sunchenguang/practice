
// const store = {
//     state: {}, // 全局唯一的state，内部变量，通过getState()获取
//     listeners: [], // listeners，用来诸如视图更新的操作
//     dispatch: () => {}, // 分发action
//     subscribe: () => {}, // 用来订阅state变化
//     getState: () => {}, // 获取state
// }

const createStore = (reducer, initState) => {
    let store = {};

    store.state = initState;
    store.listeners = [];

    store.subscribe = (listener) => {
        store.listeners.push(listener);
    }

    store.dispatch = (action) => {
        store.state = reducer(store.state, action);
        store.listeners.forEach((listener) => listener());
    }

    store.getState = () => {
        return store.state;
    }

    return store;
}




















