import BrowserService from "../../BrowserService/BrowserService";

export const logout = () => {
    BrowserService.deleteLocalStorageItem("token");
    BrowserService.deleteLocalStorageItem("user");
    BrowserService.deleteLocalStorageItem("selectedBook");
    BrowserService.changeLocation("/home")
}