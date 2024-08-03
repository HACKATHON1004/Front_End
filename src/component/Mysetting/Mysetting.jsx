import { useState } from 'react'
import styles from '../../cssModule/mys.module.css';
import { useNavigate } from 'react-router-dom'; 
import Modal2 from '../Modal2';
import Back from '../Button/Back';
import Cookies from 'js-cookie'



function App(){
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); 
    function handleCloseModal() {
        setShowModal(false);
    }
    function handleDelete() {
        setShowModal(true);
    }
    const Delete = async (e) => {
        try {
            const response = await axios.delete('http://13.209.239.251:8080/user',
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im9rIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyMjY4MzEyNiwiZXhwIjoxNzIyNjkwMzI2fQ.NMnaz0hXhmmbFN2z91odBkjKui8SzskulChtLKFSSpc`,
                }
              }
            );
      
            if (response.status === 200) {
              console.log("데이터 전송 성공");
              resetFormStates();
            } else {
              console.error("데이터 전송 실패");
            }
          } catch (error) {
            console.error("데이터 전송 중 오류 발생", error);
          }
    }

    function handleNotice() {
        navigate('/notice');  
    }

    function handleModifyUserInfo() {
        navigate('/modifyUserInfo');  
    }

    function handlePasswordChange() {
        navigate('/passwordChange');  
    }

    function handleServiceIntro() {
        navigate('/serviceIntro');  
    }

    function logOut() {
        navigate('/login');  
    }


    return(
        <div className={styles.container}>
            <Back />
            <div className={styles.Personal}>
                <div className={styles.Personalinformation}>개인 정보</div>
                <button onClick={handleModifyUserInfo} className={styles.Imformodifying}>개인정보 수정</button>
                <button onClick={handlePasswordChange} className={styles.PWmodify}>비밀번호 변경</button>
                <button onClick={handleDelete} className={styles.Withdrawal}>회원 탈퇴</button>
            </div>
            <div className={styles.Service}>
                <div className={styles.Serviceinformation}>서비스 정보</div>
                <button  onClick={handleNotice} className={styles.Notice}>공지 사항</button>
                <button onClick={handleServiceIntro} className={styles.Serviceintroduction}>서비스 소개</button>
            </div>
            <div className={styles.SignoutButton}>
              <button onClick={logOut}className={styles.Signout}>로그 아웃</button>
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