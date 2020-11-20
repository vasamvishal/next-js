import counterReducer from './reducer';
import {combineReducers} from 'redux';
import homePage from './HomePageReducer';
import logoutPopinButton from "./PopupButtonReducer";
import header from "./HeaderIconsReducer";
import siteHeader from "./SiteHeaderReducer";
import buyBookDetails from "./BuyPriceReducer";
import addToCart from "./AddToCartReducer";
import loginForm from "./LoginReducer";
// import logoutPopinButton from "./Component/PopupButtonReducer";
import registrationForm from "./RegistrationReducer";
import sucessComponent from "./SucessComponentReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    homePage,
    logoutPopinButton,
    header,
    siteHeader,
    loginForm,
    registrationForm,
    addToCart,
    sucessComponent,
    buyBookDetails
});

export default rootReducer;

// export default combineReducers({
//     homePage,
//     buyBookDetails,
//     header,
//     addToCart,
//     siteHeader,
//     loginForm,
//     logoutPopinButton,
//     registrationForm,
//     sucessComponent
// }