import { useState } from 'react'
import styles from '../cssModule/mys.module.css';
import Modal2 from './Modal2';
import '../App.css'

function App(){
    const [showModal, setShowModal] = useState(false);
    function handleCloseModal() {
        setShowModal(false);
    }
    function handleDelete() {
        setShowModal(true);
    }
    return(
        <div className={styles.container}>
            <div className={styles.Personal}>
                <div className={styles.Personalinformation}>개인 정보</div>
                <button className={styles.Imformodifying}>개인정보 수정</button>
                <button className={styles.PWmodify}>비밀번호 변경</button>
                <button onClick={handleDelete} className={styles.Withdrawal}>회원 탈퇴</button>
            </div>
            <div className={styles.Service}>
                <div className={styles.Serviceinformation}>서비스 정보</div>
                <button className={styles.Notice}>공지 사항</button>
                <button className={styles.Serviceintroduction}>서비스 소개</button>
            </div>
            <div className={styles.SignoutButton}>
              <button className={styles.Signout}>로그 아웃</button>
            </div>
            {showModal && (
                    <Modal2
                        message="정말 탈퇴 하시겠습니까?"
                        onClose={handleCloseModal}
                    />
                )}

            
        </div>
        
        
        
        
    );

};
export default App