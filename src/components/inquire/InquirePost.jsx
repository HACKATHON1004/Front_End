import styles from '../../cssModule/inquirePostContent.module.css';
import profileImage from '../../images/1.svg';

export default function InquirePost({comment, handleDelete, inquireId, isCoach}) {
    return (
        <>
            <div className={styles.inquireWrapper}>
                <div className={styles.headerWrapper}>
                    <img 
                    style={{width:"29px", height:"29px"}}
                    src={profileImage} 
                    alt="User Profile" 
                    className={styles.profileImage} 
                    />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>{comment.username}</span>
                        <span className={styles.createDate}>{comment.createDate&&comment.createDate.split("T").join(" ").slice(0,16)}</span>
                    </div>
                    <div>
                        <div style={isCoach==="true"?{display:"none"}:{}} className={styles.menuWrapper}>
                            <div onClick={()=>handleDelete(inquireId)} className={styles.menuBar}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>    
                        </div> 
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>{comment.content}</div>
                </div>        
            </div>
        </>
    )
}