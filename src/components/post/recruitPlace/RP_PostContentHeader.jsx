import styles from '../../../cssModule/postContent.module.css';

export default function RP_PostContentHeader({postData, username, comments}) {
    return (
        <>
            <div style={postData.username === username ? {} : { visibility: "hidden" }} className={styles.buttons}>
                <button className={styles.buttonModDel} onClick={() => handleDelete("mod")}>수정</button>
                <button className={styles.buttonModDel} onClick={() => handleDelete("del")}>삭제</button>
            </div>
            <div className={styles.titleWrapper}>
                <div className={styles.titles}>
                    <div className={styles.title}>
                        <span>{postData.title}</span>
                    </div>
                    <div className={styles.title}>
                        {postData.currentRecruit}/{postData.totalRecruit?postData.totalRecruit:"∞"}
                    </div>
                </div>
                <div className={styles.title}>
                    모집자 전화번호 : {postData.phone}
                </div>
                <div className={styles.postInfo}>
                    <span>{postData.createDate&&postData.createDate.split("T").join(" ").slice(0, 19)}</span>
                    <span>조회 수 {postData.view}</span>
                    <span>댓글 {comments}</span>
                </div>
            </div>
        </>
    )
}