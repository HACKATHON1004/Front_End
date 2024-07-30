import styles from '../../cssModule/home.module.css'
import userCard from '../../images/user.svg'
import Back from '../Button/Back.jsx'
import axios from "axios"
import img1 from '../../images/exercise.svg'
import img2 from '../../images/cal.svg'
import img3 from '../../images/people.svg'
import img4 from '../../images/setting.svg'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    // const isGuardian = axios.get("");
    
    const isGuardian = false;
    const navigate = useNavigate();

    function handleLink(linkName) {
        navigate(`/${linkName}`);
    }

    return (
    <>
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <span>닉네임 </span>
                {isGuardian?<span>보호자</span>:<></>}
                <span>님 환영합니다!</span>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.imgWrapper}>
                    <img src={userCard}/>
                </div>
                <div className={styles.tableWrapper}>
                    <div>
                        <span>이름</span>
                        <span>김아무개</span>
                    </div>
                    <div>
                        <span>나이</span>
                        <span>52세</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>남성</span>
                    </div>
                    <div>
                        <span>장애분류</span>
                        <span>상지 관절</span>
                    </div>
                    <div>
                        <span>관심있는 운동</span>
                        <span>근력</span>
                    </div>
                    <div>
                        <span>선호하는 운동 강도</span>
                        <span>저강도</span>
                    </div>
                </div>
            </div>
            <div className={styles.menuWrapper}>
                <div onClick={()=>handleLink("findMapHome")}>
                    <img src={img1}/>
                    <span>맞춤 운동</span>
                </div>
                <div onClick={()=>handleLink("calendar")}>
                    <img src={img2}/>
                    <span>캘린더</span>
                </div>
                <div onClick={()=>handleLink("communityHome")}>
                    <img src={img3}/>
                    <span>커뮤니티</span>
                </div>
                <div onClick={()=>handleLink("")}>
                    <img src={img4}/>
                    <span>설정</span>
                </div>
            </div>
        </div>
    </>
    )
}