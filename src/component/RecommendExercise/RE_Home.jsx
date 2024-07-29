import Back from "../Button/Back";
import styles from '../../cssModule/RE_Home.module.css'
import img1 from '../../images/yoga.svg'
import img2 from '../../images/knee.svg'

export default function RE_Home() {
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.RecommendWrapper}>
                    <div className={styles.header}>
                        <div>이런 운동을 추천해요!</div>
                        <div>더보기</div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div className={styles.image}>
                            <img src={img1}/>
                            <div>쉽게 할 수 있는 스트레칭</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}