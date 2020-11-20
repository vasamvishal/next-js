import React from "react";
import { connect } from "react-redux";
import SiteHeader from "./component/SiteHeader/SiteHeader";
import styles from "./AddToCart.module.scss";
import { toBuyPage, toGetCartDetails, cancelOrder } from "../redux/action/AddToCartAction";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import LoginToFile from "../pages/component/LoginToFile";
import BrowserService from "../BrowserService/BrowserService"
import Checkout from "../pages/component/Checkout";
import Loader from 'react-loader-spinner';
import jwt_decode from "jwt-decode";
import SucessComponent from "../pages/component/SucessComponent/SucessComponent";
import DrawerComponent from "../pages/component/DrawerComponent";
import SkeletonCart from "./component/SkeltonCart"
import Router from 'next/router';


let price = 0;

class AddToCart extends React.Component {
    isMethod = true;

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isLoading: true,
            showComponent: false,
            isLoadingNull: true,
            item: []
        }
        console.log("props constructor",Router);
    }

    componentDidMount() {
        console.log(typeof window, "type");
        if (typeof window !== "undefined") {
            this.getToken();
        }
        if (this.isMethod) {
            setTimeout(() => {
                this.setState({ isLoading: false,isLoadingNull:false })
            }, 1000)
            this.extractGetCartDetails();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (typeof window !== "undefined") {
            const value = BrowserService.getLocalStorage();
            if (value.token === undefined || value.token === null) {
                return { isAuthenticated: false };
            }
            else {
                return { isAuthenticated: true };
            }
        }
    }

    extractGetCartDetails = async() => {
        // I would have used getserverside props but i would need an window object 
        //i could not get in ssr 
        console.log("blahed");
        console.log("authenticted");
        if (this.state.isAuthenticated) {
            const token = BrowserService.getLocalStorageValue("token");
            var decoded = jwt_decode(token);
            let phoneNumber = decoded.sub;
            const res = await fetch(`https://springbootbackendjava.herokuapp.com/getCartDetails/${phoneNumber}`)
            const posts = await res.json()
            console.log(posts,"posts");
            this.setState({ item: posts });
            console.log("postsResult", posts)
            return {
                props: {
                    posts,
                },
            }
        }
        return{
            props:{}
        }
    
            // const url = `https://springbootbackendjava.herokuapp.com/getCartDetails/${phoneNumber}`;
            // return fetch(`${url}`, {
            //     mode: "cors",
            //     headers: {
            //         'Accept': 'application/json',
            //     },
            // })
            //     .then((response) => {
            //         return response.json()
            //     }).then((data) => {
            //         console.log("ewdata", data);
            //         this.setState({ item: data })
            //         return data
            //     }).catch((err) => {
            //         return Promise.reject("Error Occured while Fetching Customers " + err);
            //     });
       

    }

    calculateSubTotal = (item) => {
        let value = 0;
        item.map((state) => {
            return value += state.price * state.noOfBooks
        })
        price = value;
    }

    handleCloseOpen = () => {
        this.setState({ showComponent: true }, () => {
            console.log(document.getElementsByClassName(styles.checkoutbutton), "blah");
        });
    }

    handleClose = () => {
        this.setState({ showComponent: true }, () => {
            document.getElementsByClassName(styles.checkoutbutton).disabled = true
        });
    }

    getToken = () => {
        const value = BrowserService.getLocalStorage();
        console.log(value.token);
        if (value.token === undefined || value.token === null) {
            this.setState({ isAuthenticated: false });
        }
        else {
            console.log("tokenne");
            this.setState({ isAuthenticated: true });
        }
    }

    cancelOrder = (item) => {
        this.cancelOrder(item);
    }

    cancelOrder = (payload) => {
        const token = BrowserService.getLocalStorageValue("token");
        var decoded = jwt_decode(token);
        let phoneNumber = decoded.sub;
        const url = `https://springbootbackendjava.herokuapp.com/delete/${phoneNumber}/${payload._id}`;
        return fetch(`${url}`, {
            mode: "cors",
            method: 'DELETE'
        })
            .then((response) => {
                var array = this.state.item;
                array = array.filter(item => item !== payload)
                this.setState({ item: array })
                return response;
            }).catch((err) => {
                return Promise.reject("Error Occured while Fetching Customers " + err);
            });

    }

    

    abc = (items) => {
        return (
            <>
                {items.map((item, i) => (
                    <div key={i}>
                        <div className={styles.dog}>
                            <div className={styles.cart}>
                                <img className={styles.bookImage} src={item.image} alt={"bookImg"} />
                            </div>
                            <div id={styles.booksdetailscart}>
                                <div className={styles.itemtitle}>{item.title}</div>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <div className={styles.item}>
                                    <div className={styles.itemauthor}>Author:&nbsp;&nbsp;{item.author}</div>
                                    <div className={styles.itemprice}>Price:&nbsp;&nbsp;{item.price}</div>
                                    <div className={styles.itemquantity}>Quantity:&nbsp;&nbsp;{item.noOfBooks}</div>
                                </div>
                                <br />
                                <div className={styles.itemtotal}>Total&nbsp;Price:&nbsp;&nbsp;{item.price * item.noOfBooks}</div>
                            </div>
                            <div className={styles.cancelbutton}><CloseOutlinedIcon onClick={() => { this.cancelOrder(item) }} /></div>
                        </div>
                        <hr />
                    </div>
                )
                )}
            </>
        )
    }

    render() {
        console.log(this.state.item,"item");
        this.calculateSubTotal(this.state.item);
        
        return (
            <>
                <SiteHeader />
                {this.state.isAuthenticated === false ? <div><LoginToFile /></div> :
                    <div>
                        {this.state.item.length > 0 ?
                            <>
                                <div className={styles.checkoutmainbox}>
                                    {this.state.showComponent ? <SucessComponent items={this.state.item} /> :
                                        <>{this.state.isLoading ? <SkeletonCart itemsSkelton={this.state.item}/> : this.abc(this.state.item)}</>}
                                    <div className={styles.checkoutbox}>
                                        <div style={{ fontWeight: "bold", display: "flex", paddingTop: "0.25em", paddingLeft: "0.75em" }}>Sub Total:&nbsp;<div style={{ fontWeight: '600' }}>{price}</div></div>
                                        <div><Checkout amount={price} close={this.handleClose} /></div>
                                    </div>
                                    <DrawerComponent amount={price} showComponent={this.showComponent} close={this.handleCloseOpen} />
                                </div>
                                <br />
                            </>
                            : <>
                                {this.state.isLoadingNull ? <SkeletonCart itemsSkelton={this.state.item}/> : <div className={styles.cartImage} />}
                            </>
                        }
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        "routeToBuyPage": () => (dispatch(toBuyPage())),
        "getCartDetails": () => (dispatch(toGetCartDetails())),
        "cancelOrder": (item) => (dispatch(cancelOrder(item)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);