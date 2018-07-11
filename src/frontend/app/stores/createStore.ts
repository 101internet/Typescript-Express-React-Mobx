import {
    STORE_USER
} from "../constants/stores";
import {UserStore} from "./userStore";

const createStore = () => {
    // prepare MobX stores
    const userStore = new UserStore();

    return {
        [STORE_USER]: userStore,
    };
};

let store = null;
export const initStore = isDev => {
    if (isDev && typeof window === "undefined") {
        store = createStore();
    } else {
        if (store === null) {
            store = createStore();
        }
    }
    return store;
};