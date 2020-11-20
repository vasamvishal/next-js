
export default {
    "getWindow": function () {
        return window;
    },
    "changeLocation": function (url) {
        window.location = url;
    },
    "setLocalStorageValue": function (key, value) {
        return this.getWindow().localStorage.setItem(key, value);
    },
    "getLocalStorage": function () {
        return this.getWindow().localStorage;
    },
    "getLocalStorageValue": function (key) {
        return this.getWindow().localStorage.getItem(key);
    },
    "deleteLocalStorageItem": function (key) {
        return this.getWindow().localStorage.removeItem(key);
    },
    "clearLocalStorage": function () {
        window.localStorage.clear();
    }
}