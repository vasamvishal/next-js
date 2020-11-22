import React from "react";
import { connect } from "react-redux";
import HamburgerMenu from "../../component/HamberGerMenu";
import HeaderIcons from "../HeaderIcons/HeaderIcons";
import SearchIcon from "../SiteHeader/SearchIcon";
import styles from "./SiteHeader.module.scss";
import { withRouter } from 'react-router-dom';
import Router from "next/router";
import BrowserService from "../../../BrowserService/BrowserService";
class SiteHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            showSearch: false
        }
    }

    componentDidMount = () => {
        if (typeof window !== "undefined") {
            this.renderSearchIcon();
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

    searchValue = (e) => {
        this.props.onSearchValue(e);
    }

    render() {
        return (
            <>
                <div className={styles.headerlogo}>
                    <div className={styles.siteheadertabs}>
                        <div className={styles.hambergermenu}>
                            <HamburgerMenu />
                            {this.state.showSearch ? <div className={styles.searchIcon}>
                                <SearchIcon onSearch={this.searchValue} />
                            </div> : 
                            <div style={{ color: "#2f445c" }}>vvvvvvvvvvvvvvvvvvvvvvvv
                            vvvccccccccccccccccccccccccccsdddddc</div>}
                        </div>
                        <div className={styles.desktopicons}>
                            <HeaderIcons onSearch={this.searchValue} />
                        </div>
                    </div>
                    <style jsx global>{`
                body {
                    margin: 0;
            }
            `}</style>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state.header;
}

export default connect(mapStateToProps, null)(SiteHeader);

