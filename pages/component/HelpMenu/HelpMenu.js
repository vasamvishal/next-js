import React from "react";
import styles from "./HelpMenu.module.scss";
import TextField from '@material-ui/core/TextField';
import BrowserService from "../../../BrowserService/BrowserService";
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import {checkForNameValidation} from "../../../formValidation";

class HelpMenu extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            firstName: "",
            phoneNumber: "",
            email: "",
            emailError: false,
            phoneNumberError: false,
            firstNameError: false,
            comment: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.writeUserData = this.writeUserData.bind(this)
    }

    writeUserData() {
        this.setState({open:false})
        console.log(this.state.firstName);
        console.log(this.state.email);
        console.log(this.state.phoneNumber);
        console.log(this.state.comment);
        if(this.state.firstName !==""&& this.state.email !=="" 
        && this.state.phoneNumber !=="" )
        {
        fireBaseNew.child("users").push({
            username: this.state.firstName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            comment: this.state.comment
        },err=>{
            if(err){
                console.log(err);
            }
        });
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

    checkForFirstNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ firstNameError: false })
            this.setState({ firstName: e.target.value })
        }
        else {
            this.setState({ firstNameError: true })
        }
    }

    setComment=(e)=>{
        this.setState({comment:e.target.value})
    }

    checkForPhoneNumberValidation = (e) => {
        const phoneNumber = e.target.value;
        console.log("phoneNumber",phoneNumber);
        var phoneno = /^\d{10}$/;
        if (phoneNumber.match(phoneno)) {
            this.setState({ phoneNumberError: false })
            this.setState({ phoneNumber: phoneNumber })
        }
        else {
            this.setState({ phoneNumberError: true })
        }
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

    checkForDisabledButton() {
        if (this.state.firstNameError === false
            && this.state.phoneNumberError === false
            && this.state.emailError === false
            && this.state.firstName !== undefined
            && this.state.phoneNumber !== undefined
            && this.state.email !== undefined
        ) {
            return false;
        }
        else {
            return true;
        }
    }


    handleClick() {
        console.log("blah");
        this.setState({ open: !this.state.open })
    }

    render() {
        let css_open = this.state.open === false ? styles.helpbutton : `${styles.helpbutton} ${styles.closedialog}`
        return (
            <>
                <div id="myNav">
                    <button className={css_open} onClick={this.handleClick}>{!this.state.open ? <CommentIcon fontSize="large" style={{color:"white"}}/> : <CloseIcon fontSize="large" style={{color:"white"}}/>}</button>
                    {this.state.open ? <div><div className={styles.opendialog}>
                        <h3>XBAY</h3>
                        <h5>Hi! Let us know how we can help you</h5>
                        <form >
                            <TextField
                                id="filled-basic"
                                label="Name"
                                variant="filled"
                                error={this.state.firstNameError}
                                onChange={(e) => { this.checkForFirstNameValidation(e) }}
                            />
                            <br />
                            <br />
                            <TextField
                                id="filled-basic"
                                label="Email"
                                variant="filled"
                                error={this.state.emailError}
                                onChange={(e) => { this.checkForEmailValidation(e) }}
                            />
                            <br />
                            <br />
                            <TextField
                                id="filled-basic"
                                label="Phone Number"
                                variant="filled"
                                error={this.state.phoneNumberError}
                                onChange={(e) => { this.checkForPhoneNumberValidation(e) }}
                            />
                            <br />
                            <br />
                            <TextField
                                id="filled-multiline-static"
                                label="How can we Help?"
                                multiline
                                rows={7}
                                variant="filled"
                                style={{ width: "14em" }}
                                onChange={(e)=>{this.setComment(e)}}
                            />
                            <br />
                            <br />
                            <div className={styles.formbutton} disabled={this.checkForDisabledButton()}
                            onClick={this.writeUserData}>SEND MESSAGE</div>

                        </form> </div></div> : ""}
                </div>
            </>
        )
    }
}
export default HelpMenu