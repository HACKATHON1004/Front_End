import styles from '../../cssModule/postContent.module.css'
import Back from '../Button/Back'
import Modal2 from '../Modal2';
import Modal3 from '../Modal3';
import CmtModal from './CmtModal';
import Comment from './Comment';
import { useState } from 'react';

export default function PostContent() {
    
    let writer=1; //게시판의 글쓴이
    let writer2=2; //현재 사용중인 계정
    const [showModal, setShowModal] = useState(false); //삭제
    const [showModal2, setShowModal2] = useState(false); //수정
    const [showModal3, setShowModal3] = useState(false); //댓글 수정 및 삭제

    function handleDelete(type) {
        if(type==="del") 
            setShowModal(true);
        else if(type=="mod")
            setShowModal2(true);
        else
            setShowModal3(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setShowModal2(false);
        setShowModal3(false);
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
                    <div className={styles.content}>
                    2024 .7. 9 (화) 15:30-17:30 장소: 정릉천 (서울 성북구 종암동 113-1) 총 인원: 5명 함께 조깅할 2명의 인원을 모집합니다!
                    </div>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.recBtn}>추천</button>
                    <button className={styles.notRecBtn}>비추천</button>
                </div>
                <CmtModal msg="댓글을 남겨보세요." />
                <div className={styles.commentSection}>
                    <div className={styles.commentCnt}>
                        <div className={styles.cnt}>댓글 3개</div>
                    </div>
                    {comments.map(comment => (
                    <Comment
                        handleDelete={handleDelete}
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
                {showModal3 && (
                    <Modal3
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    )
}