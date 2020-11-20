import React from "react";
import styles from "./SucessComponent.module.scss";
import { connect } from "react-redux";
import BrowserService from "../../../BrowserService/BrowserService"
import jwt_decode from "jwt-decode";


// import { deleteAllCartDetails } from "..";

class SucessComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props,"props");
        this.state = {
            isLoading: true
        }
    }

    deleteAllCartDetails = (payload) => {
        console.log(payload,"payload");
        const token = BrowserService.getLocalStorageValue("token");
        var decoded = jwt_decode(token);
        let phoneNumber = decoded.sub;
        payload.map((item => {
            const url = `https://springbootbackendjava.herokuapp.com/delete/${phoneNumber}/${item._id}`;
            return fetch(`${url}`, {
                mode: "cors",
                method: 'DELETE'
            })
                .then((response) => {
                    return response;
                }).catch((err) => {
                    return Promise.reject("Error Occured while Fetching Customers " + err);
                });
        }))
    
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000)
        this.deleteAllCartDetails(this.props.items);
    }

    render() {
        return (
            <>
                <div className={styles.checkoutboxsucess}>
                    <i class={styles.star}></i>
                    <div className={styles.orderdone}>
                        <div className={styles.sucess}>
                            Success!
                    </div>
                        <div className={styles.ordersucess}>
                            Your Order and Payment has been accepted
                    </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        "deleteAllCartDetails": (e) => (dispatch(deleteAllCartDetails(e))),
    };
};

export default connect(null, null)(SucessComponent)