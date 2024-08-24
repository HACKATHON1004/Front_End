import { useNavigate } from 'react-router-dom';
import styles from '../../cssModule/inquire.module.css';
import profileImage from '../../images/1.svg';

export default function InquireList({comments}) {
    const navigate = useNavigate();

    const truncateContent = (content, limit) => {
        if (content.length > limit) {
            return content.substring(0, limit) + '...';
        }
        return content;
      };
    
    return (
        <>
            {comments.map(comment => (
                <div key={comment.id} onClick={()=>navigate(`post/${comment.id}`)} className={styles.comment}>
                    <div className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <img 
                            src={profileImage} 
                            alt="User Profile" 
                            className={styles.profileImage} 
                            />
                            <div className={styles.userInfo}>
                                <span className={styles.username}>{comment.username}</span>
                                <span className={styles.timestamp}>{comment.createDate}</span>
                            </div>
                        </div>  
                        <div className={comment.isAnswer?styles.replySuc:styles.replyButton}>{comment.isAnswer?"답변완료":"답변대기"}</div>
                    </div>
                    <div className={styles.content}>
                        <span>{truncateContent(comment.content, 50)}</span>
                    </div>
                </div>
        ))}
        </>
    )
}