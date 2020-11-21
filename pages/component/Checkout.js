import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import styles from "./DrawComponent.module.scss";

export default class Checkout extends React.PureComponent {

    constructor(props){
        super(props);
    }
    token=()=>{
        this.props.close()
    }

    render() {
        return (
            <StripeCheckout
                amount={this.props.amount}
                label="Checkout"
                description="Awesome Product"
                ComponentClass="div"
                name="XBAY.com"
                token={this.token}
                stripeKey="pk_test_51HcpeuGvcYbPIrMcsIVYeAbCIiHpeMyzcReJaVR4wrzhJBsdnhpU2DSZYF7aP3zdB4RJP7nC7kKa4fnMQHjUsLKC00PHY99xtN"
            >
            <button id="checkout-button" className={styles.checkoutbutton} onClick={this.handleCloseOpen}>Checkout</button>
            </StripeCheckout>
        )
    }
}