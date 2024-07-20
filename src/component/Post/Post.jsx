import styles from '../../cssModule/post.module.css'
import Back from '../Button/Back';
import PostList from '../Post/PostList.jsx'
import write from '../../images/write.svg'

export default function Post(){
    
    return (
        <>
            <Back/>
            <div className={styles.postWrapper}>
                <div className={styles.postTitle}>자유 게시판</div>
                <div className={styles.tableWrapper}>
                  <div className={styles.tableHead}>
                    <div>제목</div>
                    <div>글쓴이</div>
                    <div>날짜</div>
                    <div>조회</div>
                    <div>추천</div>
                  </div>
                  <div className={styles.tableBody}>
                    <PostList/>
                  </div>
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.postBtn}>
                    <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                    <span>글쓰기</span>
                  </button>
                </div>
            </div>
        </>
    )
}