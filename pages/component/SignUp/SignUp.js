import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Login from '../Login/Login';
import { checkForAgeValidation, checkForColourNameValidation, checkForIdValidation, checkForNameValidation } from "../../../formValidation";
// import "./SignUp.scss";


export default class SignUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            numberError: false,
            ageError: false,
            nameError: false,
            colourNameError: false,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    }

    checkForIdValidation = (e) => {
        if (checkForIdValidation(e)) {
            this.setState({ numberError: true })
        }
        else {
            this.setState({ numberError: false })
            this.setState({ Id: e.target.value })
        }
    }

    checkForNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ nameError: false })
            this.setState({ nameValue: e.target.value })
        }
        else {
            this.setState({ nameError: true })
        }
    }

    checkForAgeValidation = (e) => {
        if (checkForAgeValidation(e)) {
            this.setState({ ageError: true })
        }
        else {
            this.setState({ ageError: false })
            this.setState({ ageValue: e.target.value })
        }
    }

    checkForColourNameValidation = (e) => {
        if (checkForColourNameValidation(e) === false) {
            this.setState({ colourNameError: false })
            this.setState({ colourName: e.target.value })
        }
        else {
            this.setState({ colourNameError: true })
        }
    }
    
    displayNothing() {
        return alert("Hello! User has ID registered create a new User!");
    }

    onClosePage = () => {
        this.props.onCloseSignUpPage()
    }

    checkForDisabledButton() {
        if (this.state.numberError === false && this.state.colourNameError === false
            && this.state.ageError === false && this.state.nameError === false
            && this.state.Id !== undefined && this.state.nameValue !== undefined &&
            this.state.ageValue !== undefined && this.state.colourName !== undefined
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
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Login onClose={this.onClosePage} />
                </Dialog>
            </>
        );
    }
}