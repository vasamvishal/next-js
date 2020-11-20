import React from 'react'
import styles from "./PopupButton.module.scss";
import SignUp from '../component/SignUp/SignUp';
import { connect } from 'react-redux';
import { logout } from "../../redux/action/PopupButtonAction";
import { NavLink } from 'react-router-dom';
import Link from "next/link";
import ShowDetails from '../component/ShowDetails';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
let showAccountPopup;


class PopupButton extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isAuthenticated: false
        }
        this.resetCss();
        this.renderSignUpPage = this.renderSignUpPage.bind(this);
        this.closeSignUpPage = this.closeSignUpPage.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    resetCss=()=>{
        showAccountPopup=""
    }
    handleClickOutside = () => {
        if (this.state.show === false) {
            this.setState({ show: false }, () => {
                this.props.onCloseAccountPage();
            })
        }
    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClickOutside();
    }

    renderSignUpPage = () => {
        showAccountPopup=styles.showaccountpopup;
        if (this.state.show !== true) {
            this.setState({ show: true })
        }
    }

    closeSignUpPage() {
        if (this.state.show === true) {
            this.setState({ show: false })
        }
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <>
                <div className={showAccountPopup} ref={node => this.node = node}>
                    <div className={styles.accountpopup}>
                        <div>Your Account</div>
                        {this.props.isAuthenticated === false ? <><br /><button onClick={this.renderSignUpPage} className={styles.buttonlogin}>Log&nbsp;In/Sign&nbsp;Up</button></> : ""}
                        {this.state.show ? <SignUp onCloseSignUpPage={this.closeSignUpPage} /> : " "}
                        {this.props.isAuthenticated === true ?
                            <div>
                                <hr />
                                <ShowDetails />
                                <hr />
                                <ul className={styles.headerlinks}>
                                    <div className={styles.lidef}><FavoriteIcon style={{ paddingLeft: "26px" }} /><Link href={"/cart"}><div className={`${styles.myorders}  ${styles.myorderslogout}`}>&nbsp;My Orders</div></Link></div>
                                    <hr />
                                    <div onClick={this.logout} className={styles.lidef}><ExitToAppIcon style={{ paddingLeft: "26px" }} /><div className={`${styles.myorders}  ${styles.myorderslogout}`}>&nbsp;Logout</div></div>
                                </ul>
                            </div> : ""}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        "logout": () => (dispatch(logout())),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PopupButton)