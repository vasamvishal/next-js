import React from "react";
import SiteHeader from "../component/SiteHeader/SiteHeader";
import BooksDetails from "../component/BooksDetails";
import { connect } from "react-redux";
import styles from "./BuyPage.module.scss";
import { addToCart, deleteFromCart, setInitialStateForBuyPage, redirectToCartPage } from "../../redux/action/BuyPriceAction";
import { Redirect } from "react-router-dom";
import Router from 'next/router';
import jwt_decode from "jwt-decode";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BrowserService from "../../BrowserService/BrowserService";

class BuyPage extends React.Component {

    componentDidMount() {
        this.props.setInitialStateForBuyPage();
        this.getBookFromID(this.state.bookId);
        this.getToken();
    }

    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            booksData: [],
            noOfBooks: "",
            isAuthenticated: false,
            cartData:[]
        }
    }

    getToken = () => {
        const value = BrowserService.getLocalStorage();
        if (value.token === undefined || value.token === null) {
            this.setState({ isAuthenticated: false });
        }
        else {
            this.setState({ isAuthenticated: true });
        }
    }

    getBookFromID = (bookId) => {
        let bookDetails = JSON.parse(BrowserService.getLocalStorageValue("selectedBook"));
        return Object.keys(bookDetails).map((key) => {
            if (key === "_id" ) {
                this.setState({ booksData: bookDetails })
            }
        });
    }


    addToCart = (payload) => {
        const url = "https://springbootbackendjava.herokuapp.com/post/cart";
        const token = BrowserService.getLocalStorageValue("token");
        var decoded = jwt_decode(token);
        let phoneNumber = decoded.sub;
        const data = Object.assign(payload.item, payload.noOfBooks, { phoneNumber })
        return fetch(`${url}`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json()
            }).then((data) => {
                this.setState({cartData:data})
                return data
            }).catch((err) => {
                return Promise.reject("Error Occured while Fetching Customers " + err);
            });
    }

    noOfItemsCart = (noOfBooks) => {
        this.setState({ noOfBooks: { noOfBooks } })
    }

    addTocart = (item) => {
        if (this.state.isAuthenticated === true) {
            let noOfBooks = this.state.noOfBooks;
            this.addToCart({ item, noOfBooks })
        }
    }

    deleteProduct = () => {
        const deleteFromCart = [];
        deleteFromCart.push(this.props.buyBookDetails.addedToCart);
        if (deleteFromCart.length > 0) {
            BrowserService.deleteLocalStorageItem("selectedBook");
        }
        this.props.deleteProduct();
    }

    render() {
        if (this.props.buyBookDetails.deletedFromCart) {
            Router.push(`/home`)
        }

        let item = this.state.booksData
        return (
            <>
                <SiteHeader />
                <div>
                    <BooksDetails
                        onAddToCart={this.addTocart}
                        selectednoOfItems={this.noOfItemsCart}
                        item={item} />
                    <div className={styles.aboutsection}>
                        <div className={styles.description}>About this Product</div>
                        <div className={styles.descriptiontext}><div>{item.description}</div></div>
                        <button onClick={this.deleteProduct}
                            className={styles.deletebutton}>
                            <div className={styles.deletebuttonfont}>
                                <div><DeleteForeverIcon fontSize="small" /></div>
                                <div style={{ paddingTop: 2 }}>Delete Product</div>
                            </div>
                        </button>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </>
        )
    };
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        "deleteProduct": () => (dispatch(deleteFromCart())),
        "onAddToCart": (item) => (dispatch(addToCart(item))),
        "redirectToCartPage": (e) => (dispatch(redirectToCartPage())),
        "setInitialStateForBuyPage": () => (dispatch(setInitialStateForBuyPage()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyPage);