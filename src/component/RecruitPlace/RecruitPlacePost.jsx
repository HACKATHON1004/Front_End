import Back from "../Button/Back";
import styles from '../../cssModule/recruitPlacePost.module.css'
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";

export default function RecruitPlacePost() {
    const navigate = useNavigate();

    function handleLink(src) {
        navigate(src);
    }
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <span>장소 모집</span>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.viewButton}>
                        장소 모집 둘러보기
                        <span className={styles.icon}>🔍</span>
                        </button>
                        <button onClick={()=>handleLink("Post")} className={styles.writeButton}>
                        장소 모집 글쓰기
                        <span className={styles.icon}>✏️</span>
                        </button>
                    </div>
                    <div className={styles.dateSelector}>
                        <label className={styles.dateLabel}>날짜</label>
                        <div className={styles.selectors}>
                            <select className={styles.select}>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                            <select className={styles.select}>
                                <option>7월</option>
                                <option>8월</option>
                            </select>
                            <select className={styles.select}>
                                <option>9일</option>
                                <option>10일</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        <label className={styles.tableHeader}>장소 모집</label>
                        <PostList field="인원"/>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.searchBtn}>찾아보기</button>
                    </div>
                </div>
            </div>
        </>
    )
}