import Back from "../Button/Back";
import styles from '../../cssModule/FP_Home.module.css'
import img1 from '../../images/gps.svg'
import img2 from '../../images/pencil.svg'
import img3 from '../../images/people2.svg'
import { useNavigate } from "react-router-dom";

export default function FP_Home() {
    const navigate = useNavigate();

    function handleLink(linkName) {
        navigate(`/${linkName}`);
    }

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.bigWrapper}>
                    <div onClick={()=>handleLink("findMap")}>
                        <img src={img3}/>
                        <div>내 주변 운동시설</div>
                    </div>
                </div>
                <div className={styles.menuWrapper}>
                    <div className={styles.item}>
                        <div onClick={()=>handleLink("/")} >
                            <img src={img2}/>
                            <div>운동 질문</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}