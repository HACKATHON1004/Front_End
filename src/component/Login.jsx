import axios from "axios"
import imgLogin from "../images/1.svg"
import imgId from "../images/2.svg"
import imgPw from "../images/3.svg"
import naverLogin from "../images/5.svg"
import googleLogin from "../images/4.svg"
import Modal from "./Modal"
import styles from "../cssModule/login.module.css"
import { useRef, useState } from "react"

export default function Login(){
  const idRef = useRef();
  const pwRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const naverUrl = import.meta.env.VITE_NAVER_LOGIN_URL || process.env.REACT_APP_NAVER_LOGIN_URL;
  const googleUrl = import.meta.env.VITE_GOOGLE_LOGIN_URL || process.env.REACT_APP_GOOGLE_LOGIN_URL;

  const handleToggle = () => {
    setIsActive(!isActive); // 상태를 토글합니다.
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleNaverLogin(){
    console.log("naver login");

    window.location.href = naverUrl;
    //네이버로그인 처리
  }

  function handleGoogleLogin(){
    //구글로그인 처리

    window.location.href = googleUrl;
  }

  function handleLogin(){
    axios.post((`http://3.35.14.254:8080/api/login`),null,{
      params:{
        userId: idRef.current.value,
        passwd: pwRef.current.value
      }
    })
      .then(res=>{
        console.log(res.data.email);
      })
      .catch(err=>{
        setShowModal(true);
      })
  }
  
  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.imgWrapper}>
        <img src={imgLogin} className={styles.imgLogin} alt="Login" />
      </div>
      <div className={styles.loginText}>
        <div>Login</div>
      </div>
      <div className={styles.inputContainer}>
        <img src={imgId} alt="ID Icon" />
        <div>ID</div>
        <input type="text" id="id" ref={idRef} placeholder="ID를 입력하세요" />
      </div>
      <div className={styles.inputContainer}>
        <img src={imgPw} alt="Password Icon" />
        <div>PW</div>
        <input type="password" id="password" ref={pwRef} placeholder="비밀번호를 입력하세요" />
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.links}>
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleText}>자동 로그인</div>
          <div className={`${styles.toggle} ${isActive ? styles.active : ''}`} id="toggle" onClick={handleToggle}></div>
        </div>
      </div>
      <div>
        <button className={styles.loginBtn} onClick={handleLogin}>로그인</button>
      </div>
      <div>
        <button className={styles.loginBtn}>회원가입</button>
      </div>
      <div className={styles.easyLogin}>
        <div className={styles.line}></div>
        <span className={styles.easyLoginText}>간편 로그인</span>
        <div className={styles.line}></div>
      </div>
      <div style={{ marginBottom: "6px" }}>
        <img onClick={handleNaverLogin} src={naverLogin} className={styles.imgSocial} alt="Naver Login" />
      </div>
      <div>
        <img onClick={handleGoogleLogin} src={googleLogin} className={styles.imgSocial} alt="Google Login" />
      </div>
      {showModal && (
        <Modal
          message="아이디나 비밀번호가 올바르지 않습니다."
          onClose={handleCloseModal}
        />
      )}
    </div>  
  )
}