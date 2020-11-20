import React from "react";
import BooksComponent from "./BooksComponent";
import styles from "./BookComponent.module.scss";
class BookDetailsComponent extends React.PureComponent {
    render() {
        let item = this.props.item;
        let i = this.props.element;
        return (
            <div className={styles.info} id={i + 1}>
                <BooksComponent {...item}/>
            </div>
        )
    }
}

export default BookDetailsComponent