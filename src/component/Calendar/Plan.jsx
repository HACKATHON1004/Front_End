import Back from "../Button/Back";
import styles from "../../cssModule/plan.module.css"
import exImg from '../../images/exImg.svg'
import Modal2 from "../Modal2";
import { useState, useEffect, useRef } from "react";

export default function Plan() {
    const [showModal, setShowModal] = useState(false);
    const memoRef = useRef();

    function handleDelete() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    useEffect(() => {
        // 마운트 시 실행되는 코드
    
        return () => {
          // 종료 직전에 실행되는 코드
          console.log('컴포넌트가 종료됩니다.');
        };
      }, []);
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.date}>2024년 7월 9일</div>
                <div className={styles.planName}>000 정기모임</div>
                <div className={styles.detailHeader}>이벤트 세부사항</div>
                <div className={styles.detailWrapper}>
                    <div className={styles.placeName}>장소 : 반다비 체육센터</div>
                    <img src={exImg}/>
                    <div className={styles.address}>양산시 물금읍 부산대학로 34</div>
                    <div className={styles.tableWrapper}>
                        <div>
                            <span>시간</span>
                            <span>17:00 ~ 19:00</span>
                        </div>
                        <div>
                            <span>장소 연락처</span>
                            <span>02-777-7777</span>
                        </div>
                        <div>
                            <span>주최자 연락처</span>
                            <span>010-1234-5678</span>
                        </div>
                        <div>
                            <span>인원 수</span>
                            <span>5명</span>
                        </div>
                    </div>
                </div>
                <div className={styles.memoWrapper}>
                    <div className={styles.labelWrapper}>
                        <span>메모</span>
                    </div>
                    <div className={styles.memo}>
                        <textarea ref={memoRef}/>
                    </div>
                </div>
                <div className={styles.btnWrapper}>
                    <button onClick={handleDelete}>이벤트 삭제</button>
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    )
}