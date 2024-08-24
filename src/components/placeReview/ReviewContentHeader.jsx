import styles from '../../cssModule/placeReviewContent.module.css';
import img2 from '../../images/location.svg';

export default function ReviewContentHeader({reviewData, reviews}) {
    return (
        <>
            <div className={styles.header}>
                <span className={styles.title}>{reviewData.placeName}</span>
                <img src={img2} />
                <span className={styles.location}>{reviewData.address}</span>
            </div>
            <div className={styles.reviewInfo}>
                <span className={styles.rating}>&#9733; {reviewData.starAvg && reviewData.starAvg.toFixed(2)}</span> {/* 별표 유니코드 사용 */}
                <span className={styles.reviewCount}>방문자리뷰 {reviews}</span>
            </div>
        </>
    )
}