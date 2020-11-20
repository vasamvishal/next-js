import React from "react";
import styles from "./BooksDetails.module.scss";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

var data, text;

class BooksDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            validateInput: true,
            price: 1,
            clicked: true,
            quantity: 0
        }
    }

    changePrice = (e) => {
        data = e.target.value;
        if (isNaN(data)) {
            text = this.setState({ validateInput: false, price: 1, quantity: 0 })
        } else if (isNaN(data) || data < 1) {
            text = this.setState({ validateInput: true, price: 1, quantity: 0 })
        } else {
            this.props.selectednoOfItems(data);
            text = this.setState({ validateInput: true, price: data, quantity: data })
        }
    }

    render() {
        var buttonOnClick = this.state.clicked ? styles.cardbuttononClick : styles.cardbuttonunClicked
        const item = this.props.item
        return (
            <div className={styles.cardinfo}>
                <div className={styles.firstbox}>
                    <img className={`${styles.bookImg} ${styles.cardbookImg}`}src={item.image} alt={"bookImg"} />
                </div>
                <div className={styles.secondbox}>
                    <div className={styles.cardbookdetailsflex}>
                        <div className={styles.cardbookName}>{item.title}</div>
                        <div className={styles.cardauthorName}>{item.author}</div>
                        {this.state.quantity >= item.quantity ?
                            <div>OUT OF STOCK</div>
                            : <div style={{ display: "flex", paddingTop: "1em" }}>
                                <div className={styles.cardbookPrice}>Rs.{item.price * this.state.price}</div>
                                <div className={styles.BooksAvailable}>Books Available:&nbsp;{item.quantity - this.state.quantity}</div>
                            </div>
                        }
                    </div>
                    <div className={styles.textbutton}>
                        <input id="demo" className={styles.textbox} onChange={this.changePrice} required type={"textbox"} />
                        <button disabled={(this.state.quantity === 0 || this.state.quantity >= item.quantity)} className={buttonOnClick}
                            onClick={() => {
                                this.props.onAddToCart(item);
                                this.setState({ clicked: !this.state.clicked })
                            }}>
                            <div className={styles.button}>
                                <div><AddShoppingCartIcon style={{ paddingTop: 2,color:"white" }} fontSize="small" />&nbsp;&nbsp;</div>
                                {this.state.clicked?<div className={styles.buttonlabel}>Add To Cart</div>:<div className={styles.buttonlabel}>Item Added</div>}
                            </div>
                        </button>
                    </div>
                    {!this.state.validateInput ? <div className={styles.texterror}>Please Enter proper value</div> : <div></div>}
                    <br/>
                </div>
               
            </div>
        )
    }
}

export default BooksDetails;