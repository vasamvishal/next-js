import BrowserService from "../../BrowserService/BrowserService";
export const logout=()=>{
    BrowserService.deleteLocalStorageItem("token");
    BrowserService.deleteLocalStorageItem("selectedBook");
    BrowserService.deleteLocalStorageItem("user");
    BrowserService.changeLocation("/home")
}