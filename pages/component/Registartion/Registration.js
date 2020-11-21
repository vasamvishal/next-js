import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loader from 'react-loader-spinner';
import { registerPage, intialState } from "../../../redux/action/RegistrationAction";
import { checkForNameValidation } from "../../../formValidation";
import styles from './Registration.module.scss';
import { connect } from "react-redux";
import UserSucessfulRegistration from '../../component/UserSucessfulRegistration';

class Registration extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            firstNameError: false,
            lastNameError: false,
            userNameError: false,
            showPassword: false,
            passwordError: false,
            confirmPasswordError: false,
            emailError: false,
            phoneNumberError: false,
            registerSucess: false,
            isloading: false,
            error:100
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    componentDidMount() {
        this.props.intialState()
    }

    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleClose = () => {
        this.props.onClose();
    }

    checkForPhoneNumberValidation = (e) => {
        const phoneNumber = e.target.value;
        var phoneno = /^\d{10}$/;
        if (phoneNumber.match(phoneno)) {
            this.setState({ phoneNumberError: false })
            this.setState({ phoneNumber: phoneNumber })
        }
        else {
            this.setState({ phoneNumberError: true })
        }
    }

    checkForFirstNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ firstNameError: false })
            this.setState({ firstName: e.target.value })
        }
        else {
            this.setState({ firstNameError: true })
        }
    }

    checkForLastNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ lastNameError: false })
            this.setState({ lastName: e.target.value })
        }
        else {
            this.setState({ lastNameError: true })
        }
    }

    checkForPasswordValidation = (e) => {
        if (e.target.value !== "" && e.target.value.length >= 4) {
            this.setState({ password: e.target.value })
            this.setState({ passwordError: false })
        }
        else {
            this.setState({ passwordError: true })
        }
    }

    checkForConfirmPasswordValidation = (e) => {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("ConfirmPassword").value;
        if (password === confirmPassword) {
            this.setState({ confirmPasswordError: false })
            this.setState({ confirmpassword: e.target.value })
        }
        else {
            this.setState({ confirmPasswordError: true });
        }
    }

    checkForUserNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ userNameError: false })
            this.setState({ userName: e.target.value })
        }
        else {
            this.setState({ userNameError: true })
        }
    }

    closeRegistration = () => {
        this.props.onClose();
    }

    checkForEmailValidation = (e) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) {
            this.setState({ emailError: false })
            this.setState({ email: e.target.value })
        }
        else {
            this.setState({ emailError: true })
        }
    }

    saveRegistration = () => {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const userName = this.state.userName;
        const password = this.state.password;
        const confirmpassword = this.state.confirmpassword;
        const phoneNumber = this.state.phoneNumber;
        const email = this.state.email;
        this.setState({ isloading: true })
        this.registerUser({ firstName, lastName, userName, password, confirmpassword, phoneNumber, email });
    }

    registerUser = (item) => {
        const url = "https://springbootbackendjava.herokuapp.com/post/customerInfoDetails";
        return fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            mode: "cors",
            body: JSON.stringify(item)
        })
            .then((response) => {
                return response;
            }).then((data) => {
                this.setState({error:data.status})
                return data;
            })
            .catch((err) => {
                return Promise.reject("Error Occured while Fetching Customers " + err);
            });
    };

    checkForDisabledButton() {
        if (this.state.firstNameError === false
            && this.state.lastNameError === false
            && this.state.userNameError === false
            && this.state.phoneNumberError === false
            && this.state.emailError === false
            && this.state.passwordError === false
            && this.state.confirmPasswordError === false
            && this.state.firstName !== undefined
            && this.state.lastName !== undefined
            && this.state.userName !== undefined
            && this.state.phoneNumber !== undefined
            && this.state.password !== undefined
            && this.state.confirmpassword !== undefined
            && this.state.email !== undefined
        ) {
            return false;
        }
        else {
            return true;
        }
    }
    render() {
        return (
            <>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Create Your Account"}</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                required
                                error={this.state.firstNameError}
                                id="outlined-error-helper-text"
                                label="FirstName"
                                helperText={this.state.firstNameError ? "Incorrect value" : ""}
                                variant="outlined"
                                onChange={(e) => { this.checkForFirstNameValidation(e) }} />&nbsp;&nbsp;&nbsp;
                            <TextField required
                                error={this.state.lastNameError}
                                id="outlined-error-helper-text"
                                label="LastName"
                                helperText={this.state.lastNameError ? "Incorrect value" : ""}
                                variant="outlined"
                                onChange={(e) => { this.checkForLastNameValidation(e) }} />
                            <br />
                            <br />
                            <TextField required
                                error={this.state.userNameError}
                                id="outlined-error-helper-text"
                                label="userName"
                                helperText={this.state.userNameError ? "Incorrect value" : ""}
                                variant="outlined"
                                onChange={(e) => { this.checkForUserNameValidation(e) }} />
                            <br />
                            <br />
                            <TextField
                                required
                                error={this.state.passwordError}
                                id="password"
                                label="password"
                                helperText={this.state.passwordError ? "Password should be greather than 4" : ""}
                                type={this.state.showPassword ? 'text' : 'password'}
                                variant="outlined"
                                onChange={(e) => { this.checkForPasswordValidation(e) }} />&nbsp;&nbsp;&nbsp;

                            <TextField required
                                error={this.state.confirmPasswordError}
                                id="ConfirmPassword"
                                label="confirm"
                                helperText={this.state.confirmPasswordError ? "Incorrect Password" : ""}
                                type={this.state.showPassword ? 'text' : 'password'}
                                variant="outlined"
                                onChange={(e) => { this.checkForConfirmPasswordValidation(e) }} />

                            {!this.state.showPassword ? <VisibilityOffIcon fontSize="large" style={{ paddingTop: "0.25em" }} onClick={this.showPassword} /> : <VisibilityIcon style={{ paddingTop: "0.25em" }} onClick={this.showPassword} fontSize="large" />}
                            <br />
                            <br />
                            <TextField required
                                error={this.state.phoneNumberError}
                                id="outlined-error-helper-text"
                                label="Phone Number"
                                helperText={this.state.phoneNumberError ? "Phone Number should be proper" : ""}
                                variant="outlined"
                                onChange={(e) => { this.checkForPhoneNumberValidation(e) }} />
                            <br />
                            <br />
                            <TextField required
                                error={this.state.emailError}
                                id="outlined-error-helper-text"
                                label="email"
                                helperText={this.state.emailError ? "Incorrect Email Id" : ""}
                                variant="outlined"
                                onChange={(e) => { this.checkForEmailValidation(e) }} />
                            <br />
                            <br />
                        </form>
                        {this.state.error === 400 || this.state.error === 404 ? <div className={styles.warning}>userName or phoneNumber is already registrated</div> : ""}
                    </DialogContent>
                    {this.state.isloading === true ? <Loader
                        type="TailSpin"
                        color="black"
                        height={30}
                        width={500}
                        timeout={1000} /> : ""}
                    <DialogActions>
                        <Button onClick={this.handleClose, this.closeRegistration} color="primary">
                            BACK
                        </Button>
                        <Button disabled={this.checkForDisabledButton()}
                            onClick={this.saveRegistration}
                            color="primary" autoFocus>
                            CREATE
                        </Button>
                    </DialogActions>
                    {this.state.error === 200  ? <UserSucessfulRegistration close={this.props.onClose} /> : ""}
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        "registerPage": (item) => (dispatch(registerPage(item))),
        "intialState": () => (dispatch(intialState())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);