import styles from '../../cssModule/recruitPlaceHome.module.css'
import Back from '../Button/Back'
import img1 from '../../images/gps.svg'
import img2 from '../../images/pencil.svg'
import img3 from '../../images/people2.svg'

export default function RecruitPlaceHome() {
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                    <div className={styles.menuWrapper}>
                        <div className={styles.item}>
                            <div>
                                <img src={img1}/>
                                <div>장소 모집</div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div>
                                <img src={img2}/>
                                <div>장소 리뷰</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bigWrapper}>
                        <div>
                            <img src={img3}/>
                            <div>자유 게시판</div>
                        </div>
                    </div>
            </div>
        </>
    )
}