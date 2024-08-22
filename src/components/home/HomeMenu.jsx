import styles from '../../cssModule/home.module.css';
import img1 from '../../images/exercise.svg'
import img2 from '../../images/cal.svg'
import img3 from '../../images/people.svg'
import img4 from '../../images/setting.svg'

export default function HomeMenu({onNavigate}) {
    return (
        <div className={styles.menuWrapper}>
            <div onClick={()=>onNavigate("findMapHome")}>
                <img src={img1}/>
                <span>맞춤 운동</span>
            </div>
            <div onClick={()=>onNavigate("calendar")}>
                <img src={img2}/>
                <span>캘린더</span>
            </div>
            <div onClick={()=>onNavigate("communityHome")}>
                <img src={img3}/>
                <span>커뮤니티</span>
            </div>
            <div onClick={()=>onNavigate("Mysettings")}>
                <img src={img4}/>
                <span>설정</span>
            </div>
        </div>
    )
}