import React from "react";
import { withStyles } from '@material-ui/core/styles';
import styleNew from "../../pages/AddToCart.module.scss";
import { red } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

// import Skeleton from "react-loading-skeleton";
import Skeleton from '@material-ui/lab/Skeleton';
  export default function SkeltonCart({itemsSkelton}) {
    // const classes = useStyles();  
        return (
            itemsSkelton.map((item, i) => (
                <div key={i}>
                    <div className={styleNew.dog}>
                        <div className={styleNew.cart}>
                            {/* <div className={styleNew.cartSkelton}> */}
                            <Skeleton width={"10em"} height={"13em"}/>
                            {/* </div> */}
                        </div>
                        <div id={styleNew.booksdetailscart}>
                            <div className={styleNew.cartDiv}>
                            <Skeleton/>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                <div className={styleNew.item}>
                                <div className={styleNew.display}>
                                    <div className={styleNew.itemauthor}><Skeleton /></div>
                                    <div className={styleNew.itemprice}><Skeleton  /></div>
                                    <div className={styleNew.itemquantity}><Skeleton /></div>
                                </div>
                            </div>
                            <br />
                            <Skeleton/>
                            </div>
                            {/* <div className={styles.itemtotal}><Skeleton style={{width:"4em"}}/></div> */}
                        </div>
                        {/* <div className={styles.cancelbutton}><CloseOutlinedIcon onClick={() => { this.cancelOrder(item) }} /></div> */}
                    </div>
                    <hr />
                </div>
            )
            )
        )
    }

