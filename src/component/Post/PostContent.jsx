import styles from '../../cssModule/postContent.module.css'
import Back from '../Button/Back'
import Modal2 from '../Modal2';
import CmtModal from './CmtModal';
import Comment from './Comment';
import { useState } from 'react';

export default function PostContent() {
    
    let writer=1; //게시판의 글쓴이
    let writer2=2; //현재 사용중인 계정
    const [showModal, setShowModal] = useState(false); //삭제
    const [showModal2, setShowModal2] = useState(false); //수정

    function handleDelete(type) {
        if(type==="del") 
            setShowModal(true);
        else 
            setShowModal2(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setShowModal2(false);
    }

    const comments = [
        {
          id: 1,
          username: '민머시기',
          text: '빨리 급함',
          timestamp: '2024.07.16. 20:44',
          profilePic: 'https://via.placeholder.com/50'
        },
        {
          id: 2,
          username: '홍길동',
          text: '민머시기 어디서 하는데?',
          timestamp: '2024.07.16. 20:45',
          profilePic: 'https://via.placeholder.com/50'
        },
        {
          id: 3,
          username: '민머시기',
          text: '홍길동 잠실!!',
          timestamp: '2024.07.16. 20:46',
          profilePic: 'https://via.placeholder.com/50'
        }
      ];
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div style={writer !== writer2 ? {} : { visibility: "hidden" }} className={styles.buttons}>
                    <button className={styles.buttonModDel} onClick={() => handleDelete("mod")}>수정</button>
                    <button className={styles.buttonModDel} onClick={() => handleDelete("del")}>삭제</button>
                </div>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <span>축구할 사람 구함</span>
                    </div>
                    <div className={styles.postInfo}>
                        <span>조회 수 1550</span>
                        <span>추천 수 100</span>
                        <span>댓글 3</span>
                    </div>
                </div>
                <div className={styles.contentWrapper}>

                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.recBtn}>추천</button>
                    <button className={styles.notRecBtn}>비추천</button>
                </div>
                <CmtModal/>
                <div className={styles.commentSection}>
                    <div className={styles.commentCnt}>
                        <div className={styles.cnt}>댓글 3개</div>
                    </div>
                    {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        username={comment.username}
                        text={comment.text}
                        timestamp={comment.timestamp}
                        profilePic={comment.profilePic}
                    />
                    ))}
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={handleCloseModal}
                    />
                )}
                {showModal2 && (
                    <Modal2
                        message="수정 하시겠습니까?"
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    )
}