import React from "react";
import Link from "next/Link";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {MemoizedIcon} from "../../IconComponent";
import BrowserService from "../../BrowserService/BrowserService";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import styles from "./HeaderMobile.module.scss";

class HeaderMobile extends React.PureComponent {

    logout = () => {
        BrowserService.deleteLocalStorageItem("token");
        BrowserService.deleteLocalStorageItem("user");
        BrowserService.deleteLocalStorageItem("selectedBook");
        BrowserService.changeLocation("/home")
    }

    render() {
        return (
            <ul className={styles.mobilehambergermenu}>
                <div className={styles.mobileaboutUs}>
                    <Link href="/account">
                        <a><MemoizedIcon icon={<LabelImportantIcon fontSize="large"/>} name="About Us" /></a>
                    </Link>
                </div>
                <hr className={styles.Class}/>
                <div className={styles.mobilecart}>
                    <Link href="/cart">
                        <a><MemoizedIcon icon={<ShoppingCartIcon fontSize="large" />} name="Cart" /></a>
                    </Link>
                </div>
                <hr className={styles.Class}/>
                {this.props.authenticated?<><div className={styles.mobilelogout} onClick={this.logout}>
                    <div style={{display:"flex"}}><ExitToAppIcon fontSize="large"/><div>&nbsp;&nbsp;Logout</div> </div>
                </div>
                <hr className={styles.Class}/></>:""}
            </ul>
        )
    }
}
export default HeaderMobile