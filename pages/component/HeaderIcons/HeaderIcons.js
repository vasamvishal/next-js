import React from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from "../SiteHeader/SearchIcon";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { connect } from "react-redux";
import { NavLink, withRouter } from 'react-router-dom';
import Link from "next/link";
import Router from 'next/router';
import styles from "./HeaderIcon.module.scss";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircle';
import SignUp from "../SignUp/SignUp";
import PopupButton from "../../component/PopupButton";
import BrowserService from "../../../BrowserService/BrowserService";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { logout } from "../../../redux/action/HeaderIconsAction";
let id = "Home";

class HeaderIcons extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            signUpPage: false,
            loginPage: true,
            isAuthenticated: false,
            showSearch: false,
            css: true
        }
        this.signUpPage = this.signUpPage.bind(this);
        this.closeSignUpPage = this.closeSignUpPage.bind(this);
    }

    componentDidMount = () => {
        this.renderSearchIcon();
    }

    signUpPage = () => {
        if (this.state.signUpPage !== true) {
            this.setState({ signUpPage: !this.state.signUpPage })
        }
    }

    renderSearchIcon = () => {
        if (Router.pathname.match("/home")) {
            this.setState({ showSearch: true })
        }
        else {
            this.setState({ showSearch: false })
        }
    }

    accountDetails = () => {
        this.setState({ accountDetails: true })
    }

    closeSignUpPage = () => {
        if (this.state.signUpPage === true) {
            this.setState({ signUpPage: false })
        }
    }

    closeSignUpPageOnAccountPage = () => {
        if (this.state.accountDetails === true) {
            this.setState({ signUpPage: false })
        }
    }

    closeAccountDetails = () => {
        this.setState({ accountDetails: false })
    }

    search = (e) => {
        this.props.onSearch(e);
    }

    showHeaderCss = () => {
        this.setState({ css: !this.state.css })
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

    onChange = () => {
        if (typeof window !== "undefined") {
            Router.push({
                pathname: '/home',
                locale: `${id}`
            })
        }
    }

    render() {
        return (
            <>
                <ul className={styles.headerexample}>
                    {typeof window !== "undefined" ?
                        <>
                            <li id="home" className={Router.pathname !== "/home" ? styles.home : `${styles.home} ${styles.active}`} >
                                <Link href={{ pathname: "/home", as: "/vlah" }}>
                                    <a> XBAY </a>
                                </Link>
                            </li>


                            <li id="aboutUs" className={Router.pathname !== "/account" ? styles.aboutUs : `${styles.aboutUs} ${styles.active}`}>
                                <Link href="/account" as="/account">
                                    <a><LabelImportantIcon />&nbsp;&nbsp;
                        <div>About&nbsp;Us</div></a>
                                </Link>
                            </li>

                            <li id="cart-desktop" className={Router.pathname !== "/cart" ? styles.cartdesktop : `${styles.cartdesktop} ${styles.active}`}>
                                <Link href="/cart" as="/cart">
                                    <a><ShoppingCartIcon />&nbsp;&nbsp;
                        <div>Cart</div></a>
                                </Link>
                            </li>

                            <li id="account-data" className={styles.accountdata} onClick={this.accountDetails}>
                                <AccountCircleRoundedIcon className={styles.defeee} />&nbsp;&nbsp;
                        <div>Account</div>
                                {this.state.accountDetails ? <div><PopupButton onCloseSignUpPage={this.closeSignUpPageOnAccountPage} onCloseAccountPage={this.closeAccountDetails} isAuthenticated={this.state.isAuthenticated} /></div> : ""}
                            </li>

                            {
                                this.state.isAuthenticated === false ?
                                    <li id="signUp" className={styles.signUp} onClick={this.signUpPage}> <AccountBoxIcon />&nbsp;&nbsp;
                        <div>Sign&nbsp;Up</div>
                                        {this.state.signUpPage && this.props.logoutPopinButton.logout === false ? <div><SignUp onCloseSignUpPage={this.closeSignUpPage} /></div> : ""}
                                    </li>
                                    : <li id="logout" className={styles.logout} onClick={this.props.logout}> <ExitToAppIcon />&nbsp;&nbsp;
                        <div>Logout</div>
                                    </li>
                            }

                            {
                                this.state.showSearch ?
                                    <div className={styles.searchDef}>
                                        <SearchIcon onSearch={this.search} />
                                    </div> : ""
                            }
                        </>
                        : ""}
                </ul >
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        "logout": () => (dispatch(logout()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderIcons);
