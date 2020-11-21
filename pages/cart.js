import React from "react";
import { connect } from "react-redux";
import SiteHeader from "./component/SiteHeader/SiteHeader";
import styles from "./AddToCart.module.scss";
import { toBuyPage, toGetCartDetails, cancelOrder } from "../redux/action/AddToCartAction";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import LoginToFile from "../pages/component/LoginToFile";
import BrowserService from "../BrowserService/BrowserService"
import jwt_decode from "jwt-decode";
import DrawerComponent from "../pages/component/DrawerComponent";
import SkeletonCart from "./component/SkeltonCart"
import dynamic from "next/dynamic";
import Loader from 'react-loader-spinner';
import Skeleton from "@material-ui/lab/Skeleton";
const SucessComponent = dynamic(() => import('../pages/component/SucessComponent/SucessComponent'));
const Checkout = dynamic(() => import('../pages/component/Checkout'));


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
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            this.getToken();
        }
        if (this.isMethod) {
            setTimeout(() => {
                this.setState({ isLoading: false, isLoadingNull: false })
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

    extractGetCartDetails = async () => {
        // I would have used getserverside props but i would need an window object 
        //i could not get in ssr

        if (this.state.isAuthenticated) {
            const token = BrowserService.getLocalStorageValue("token");
            var decoded = jwt_decode(token);
            let phoneNumber = decoded.sub;
            const res = await fetch(`https://springbootbackendjava.herokuapp.com/getCartDetails/${phoneNumber}`)
            const posts = await res.json()
            this.setState({ item: posts });
            return {
                props: {
                    posts,
                },
            }
        }
        return {
            props: {}
        }

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
        if (value.token === undefined || value.token === null) {
            this.setState({ isAuthenticated: false });
        }
        else {
            this.setState({ isAuthenticated: true });
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.loginForm.login, "prevprops");
        console.log(this.props.loginForm.login, "props");
        if (prevProps.loginForm.login !== this.props.loginForm.login) {
            this.extractGetCartDetails();
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
                                        <>{this.state.isLoading ? <SkeletonCart itemsSkelton={this.state.item} /> : this.abc(this.state.item)}</>}
                                    <div className={styles.checkoutbox}>
                                        {this.state.isLoading ? <Skeleton width="15em" height="2em"/> : <>
                                            <div style={{ fontWeight: "bold", display: "flex", paddingTop: "0.25em", paddingLeft: "0.75em" }}>Sub Total:&nbsp;<div style={{ fontWeight: '600' }}>{price}</div></div>
                                            <div><Checkout amount={price} close={this.handleClose} /></div>
                                        </>}
                                    </div>
                                    <DrawerComponent amount={price} showComponent={this.showComponent} close={this.handleCloseOpen} loading={this.state.isLoading}/>
                                </div>
                                <br />
                            </>
                            : <>
                                {this.state.isLoadingNull ? <div className={styles.loader}><Loader type="TailSpin" color="#00BFFF" height={500} width={200} timeout={200000} /> </div> : <div className={styles.cartImage} />}
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