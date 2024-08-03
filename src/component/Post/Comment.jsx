import styles from '../../cssModule/comment.module.css'

export default function Comment({ username, id, text, timestamp, profilePic, handleDelete }) {
    return (
        <div key={id} className={styles.comment}>
            <img src={profilePic} alt="User profile picture" />
            <div className={styles.commentContent}>
                <div className={styles.username}>{username}</div>
                <div className={styles.text}>{text}</div>
                <div className={styles.timestamp}>{timestamp.split("T").join(" ")} <span className={styles.reply}>답글 달기</span></div>
            </div>
            <div className={styles.menuWrapper}>
                <div onClick={()=>handleDelete(id)} className={styles.menuBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}