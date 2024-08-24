import { useEffect, useState } from "react";
import styles from '../../cssModule/placeReviewContent.module.css';

export default function ReviewList({reviews}) {
    
    return (
        <>
            <div className={styles.reviewList}>
                {reviews.map((item, index) => (
                    <div key={index} className={styles.reviewItem}>
                        <div className={styles.userInfo}>
                            <div className={styles.userIcon}>👤</div>
                            <div className={styles.userWrapper}>
                                <div>
                                    <span className={styles.userId}>{item.username.slice(0, 3)}***</span>
                                    <div>
                                        {[...Array(item.starRating)].map((_, i) => (
                                            <span key={i}>&#9733;</span> // 별표 유니코드
                                        ))}
                                    </div>
                                </div>
                                <div>{item.createDate.split("T").join(" ")}</div>
                            </div>
                        </div>
                        <div className={styles.userReviewWrapper}>
                            <p className={styles.userReview}>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}