import Back from "../Button/Back";
import styles from '../../cssModule/FP_Home.module.css'
import img1 from '../../images/gps.svg'
import img2 from '../../images/pencil.svg'
import img3 from '../../images/people2.svg'

export default function FP_Home() {
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.bigWrapper}>
                    <div>
                        <img src={img3}/>
                        <div>내 주변 운동시설</div>
                    </div>
                </div>
                <div className={styles.menuWrapper}>
                    <div className={styles.item}>
                        <div>
                            <img src={img1}/>
                            <div>지도에서 찾기</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <img src={img2}/>
                            <div>운동 질문</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}