import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import styles from "./SkeletonCard.module.scss";

const SkeletonCard = () => {
    return (
        // <section>
            <div className={styles.cardblockblock}>
                {/* <Skeleton/> */}
                <Card className={styles.card}>
                    <div className={styles.info}>
                        <div className={styles.bookflex}>
                            <div className={styles.imageSpace}>
                                <Skeleton width={"10em"} height={"13em"}/>
                            </div>
                            <div>
                                <div className={`${styles.bookName} ${styles.bookNameskelton}`}>
                                    <Skeleton height={13} width={"12em"} />

                                </div>
                                <div className={styles.authorName}>
                                    <Skeleton height={11} width={"12em"} />

                                </div>
                                <div className={`${styles.bookName} ${styles.bookNameskelton}`}>
                                    <Skeleton height={13} width={"12em"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        // </section>
    );
};

export default SkeletonCard;