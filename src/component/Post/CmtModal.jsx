import styles from '../../cssModule/postContent.module.css'
import { useState, useRef, useEffect } from 'react';
import profile from '../../images/1.svg'

export default function CmtModal() {
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);
  const [isBox, setIsBox] = useState(false);
  const commentRef = useRef();

  function handleClickOutside(e) {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
        setCommentBoxVisible(false);
        setIsBox(false);
        setTimeout(() => {
            setCommentBoxVisible(false);
        }, 800)
    }
  }

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  const handleCommentBoxToggle = () => {
    setIsBox(!isBox);
    
    if(!isCommentBoxVisible){
        setTimeout(() => {
            setCommentBoxVisible(prevState => !prevState);
        }, 800)
    }
    else{
        setCommentBoxVisible(prevState => !prevState);
    }
  };

    return (
      <div ref={commentRef} className={styles.commentWrapper}>
      {/* <div onClick={toggleCommentBox} className={styles.comment}>
          <span>댓글을 남겨보세요.</span>
      </div> */}
      {isCommentBoxVisible ? (
          <div className={styles.commentBox}>
              <div className={styles['comment-header']}>
                  <div className={styles.profileWrapper}>
                      <img src={profile} alt="Profile" className={styles['profile-image']} />
                      <span>민머시기</span>
                  </div>
                  <span className={styles['char-count']}>0/6000</span>
              </div>
              <textarea className={styles['comment-textarea']} placeholder="댓글을 남겨보세요." />
              <div className={styles['comment-actions']}>
                  <button className={styles['cancel-button']} onClick={handleCommentBoxToggle}>취소</button>
                  <button className={styles['submit-button']}>등록</button>
              </div>
          </div>
      ) : (
          <div onClick={handleCommentBoxToggle} className={`${styles.comment} ${isBox?styles.active:''}`}>
              <span>댓글을 남겨보세요.</span>
          </div>
      )}
      {/* <div onClick={handleCommentBoxToggle} className={`${styles.comment} ${isCommentBoxVisible?styles.active:''}`}>
          <span>댓글을 남겨보세요.</span>
      </div> */}
  </div>
    )
}
