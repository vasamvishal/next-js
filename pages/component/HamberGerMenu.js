import React from "react";
import styles from "./HamberGerMenu.module.scss";
import MenuIcon from '@material-ui/icons/Menu';
import HeaderMobile from "./HeaderMobile";
import BrowserService from "../../BrowserService/BrowserService";
import ShowDetailsHamberGerMenu from "../Component/ShowDetailsHamberGerMenu";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircle';

class HamburgerMenuExport extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            open: true,
            isAuthenticated: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.closeNav = this.closeNav.bind(this)
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

    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    handleClick() {
        this.getToken();
        document.getElementById("myNav").style.width = "100%";
    }
    render() {
        return (
            <>
                <div id="myNav" className={styles.overlay}>
                    <div>{!this.state.isAuthenticated ? <div className={styles.loginsignup}>LOGIN/SIGNUP</div>
                        : <div className={styles.loginsignup}>
                            <div style={{ display: "flex" }}>
                                <AccountCircleRoundedIcon style={{ fontSize: "60", marginLeft: "0.5em" }} />
                                <div><ShowDetailsHamberGerMenu /></div>
                            </div>
                        </div>}</div>
                    <a className={styles.closebtn} onClick={() => this.closeNav()}>&times;</a>
                    <div className={styles.overlaycontent}>
                        <HeaderMobile authenticated={this.state.isAuthenticated} />
                    </div>
                </div>
                <MenuIcon onClick={() => this.handleClick()} style={{
                    fontSize: 40, color: 'white', marginTop: '1.25vh',
                    paddingLeft: '7px'
                }}>openClose</MenuIcon>
            </>
        )
    }
}
export default HamburgerMenuExport