import styles from '../../../cssModule/postContent.module.css';

export default function FP_PostContentHeader({comments, username, postData}) {
    return (
        <>
            <div style={postData.username === username ? {} : { visibility: "hidden" }} className={styles.buttons}>
                <button className={styles.buttonModDel} onClick={() => handleDelete("mod")}>수정</button>
                <button className={styles.buttonModDel} onClick={() => handleDelete("del")}>삭제</button>
            </div>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>
                    <span>{postData.title}</span>
                </div>
                <div className={styles.postInfo}>
                    <span>{postData.createDate&&postData.createDate.split("T").join(" ").slice(0, 16)}</span>
                    <span>조회 수 {postData.view}</span>
                    <span>추천 수 {postData.totalRecommend}</span>
                    <span>댓글 {comments}</span>
                </div>
            </div>
        </>
    )
}