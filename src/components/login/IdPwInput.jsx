import styles from '../../cssModule/login.module.css';
import imgId from '../../images/2.svg';
import imgPw from '../../images/3.svg';

export default function IdPwInput({idRef, pwRef}) {
    return (
        <>
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
        </>
    )
}