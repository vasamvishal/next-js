import React from "react";
import styles from "./BooksComponent.module.scss";
import Skeleton from 'react-loading-skeleton';
//  <Skeleton className={styles.rootblock}/> // Simple, single-line loading skeleton
// <Skeleton count={5}/> // Five-line loading skeleton

export default class BooksComponent extends React.PureComponent {
    constructor() {
        super();
        // this.value();
    }

    value = () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "https://books.google.com/"
    }

    render() {
        var item = this.props
        return (
            <>
                <div className={styles.bookflex}>
                    <div className={styles.imageSpace}>
                        <img className={styles.bookImg} src={item.image} alt={"bookImg"} />
                    </div>
                    <div>
                        <div className={styles.bookName}>{item.title}</div>
                        <div className={styles.authorName}>{item.author}</div>
                        <div className={styles.bookName}>Rs.{item.price}</div>
                    </div>
                </div>
            </>
        )
    }
}

