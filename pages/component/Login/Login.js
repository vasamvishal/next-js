import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import styles from './Login.module.scss';
import { connect } from "react-redux";
import Registration from '../Registartion/Registration';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import BrowserService from "../../../BrowserService/BrowserService";
import { login, setInitialState } from "../../../redux/action/LoginAction";

class Login extends React.PureComponent {
    didMount = false;

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            userName: "",
            password: "",
            isLoading: false,
            error: this.props.status
        }
        this.back = this.back.bind(this);
        this.renderButtonEffect = this.renderButtonEffect.bind(this);
    }

    back = () => {
        this.setState({ error: 200 }, () => {
            this.props.onClose()
        });
    }

    renderRegisterPage = () => {
        this.setState({ show: !this.state.show })
    }

    componentDidMount() {
        this.props.setInitialState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status === 400 && this.didMount === false) {
            this.didMount = true;
            this.setState({ error: this.props.status })
        }
    }

    userName = (e) => {
        this.setState({ userName: e.target.value })
    }

    password = (e) => {
        this.setState({ password: e.target.value })
    }

    closeRegistration = () => {
        this.setState({ show: !this.state.show })
    }

    renderButtonEffect = () => {
        this.setState({ isLoading: true })
    }

    renderMainPage = () => {
        let userName = this.state.userName;
        let password = this.state.password;
        let item = { userName, password }
        if (typeof window !== "undefined") {
            const value = this.login(item)
            value.then((response) => {
                this.setState({ error: response.status}, () => {
                    if (this.state.error === 200) {
                        this.props.onClose();
                    }
                })
            });
        }
    }

    login = (item) => {
        const url = "https://springbootbackendjava.herokuapp.com/login";
        return fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(item)
        })
            .then((response) => {
                for (var pair of response.headers.entries()) {
                    if (pair[0] === 'token') {
                        BrowserService.setLocalStorageValue("token", pair[1])
                    }
                }
                let responseText = response.text();
                return [responseText, response];
            }).then((data) => {
                data[0].then((data) => BrowserService.setLocalStorageValue("user", data));
                var response = data[1];
                return response;
            })
            .catch((err) => {
                return Promise.reject("Error Occured while Fetching Customers " + err);
            });
    }

    render() {
        let loginButton = (this.state.userName !== "" && this.state.password !== "") ? styles.buttontext : `${styles.buttontext} ${styles.backgroundbuttontext}`

        if (this.state.show) {
            return <Registration onClose={this.closeRegistration} />
        }
        return (
            <React.Fragment>
                <div className={styles.flex}>
                    <div className={styles.leftarticle}>
                        <h2 style={{ color: "white", marginTop: "69%", marginLeft: "2em" }}>XBAY&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    </div>
                    <div className={styles.rightarticle}>
                        <MuiThemeProvider>
                            <h3 className={styles.companyname}><CloseOutlinedIcon onClick={this.back} /></h3>
                            <div className={styles.loginbutton}>
                                <div className={styles.logo}>Log&nbsp;In</div>
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"
                                    id="outlined-basic" label="Outlined" variant="outlined"
                                    onChange={this.userName} />
                                <br />
                                <TextField
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    id="outlined-basic" label="Outlined"
                                    variant="outlined"
                                    type="password"
                                    onChange={this.password}
                                />
                                <br></br>
                                <br></br>
                                {this.state.error !== 200 ? <p>Your login credentials could not be verified, please try again.</p> : ""}
                                <button disabled={(this.state.userName === "" && this.state.password === "")} className={loginButton} onClick={this.renderMainPage}>
                                    <div onClick={this.renderButtonEffect}>Log&nbsp;In</div>
                                </button>
                                <br />
                                <br />
                                <div className={styles.forgotpassword}>Forgot&nbsp;password?</div>
                                <br />
                                <br />
                                <div className={styles.account} onClick={this.renderRegisterPage}>Create your Account</div>
                                <br />
                                <br />
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return state.loginForm;
}

const mapDispatchToProps = (dispatch) => {
    return {
        "login": (item) => (dispatch(login(item))),
        "setInitialState": () => (dispatch(setInitialState()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

