
import React from "react";
import Checkout from "../component/Checkout";
import styles from "./DrawComponent.module.scss";

export default class DrawerComponent extends React.PureComponent {
    render() {
        return (
            <>
                {!this.props.loading ?
                    <div className={styles.checkoutbox1}>
                        <div style={{ fontWeight: "bold", display: "flex", paddingTop: "0.25em", paddingLeft: "0.75em" }}>Sub Total:&nbsp;<div style={{ fontWeight: '600' }}>{this.props.amount}</div></div>
                        <div><Checkout amount={this.props.amount} close={this.props.close} /></div>
                    </div> : ""
                }
            </>
        )
    }
}