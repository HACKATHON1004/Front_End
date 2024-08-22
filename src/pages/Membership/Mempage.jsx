import React, { useState } from 'react';
import styles from '../../cssModule/Mempage.module.css';
import Back from '../../components/Button/Back';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

function Mempage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identify, setIdentify] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(false);
  const [idMessage, setIdMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    identify: "",
    password: "",
    confirmPassword: "",
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const returnCheckboxChange = () => {
    setReturnChecked(!returnChecked);
  };

  const handleIdCheck = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/${identify}`);
      const data = await response.json();
      console.log(data);
      if (!data) {
        setIdMessage("이미 사용중인 아이디입니다.");
        setIsIdChecked(false);
      } else {
        setIdMessage("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      }
    } catch (error) {
      setIdMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdChecked(false);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let message = "";

    if (password.length < minLength) {
      message = `비밀번호는 ${minLength}자 이상이어야 합니다.`;
    } else if (!hasSpecialChar) {
      message = "비밀번호는 특수문자를 포함해야 합니다.";
    }

    return message;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setPasswordErrorMessage(validationMessage);
    checkPasswordMatch(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkPasswordMatch(password, newConfirmPassword);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword && password.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치합니다.");
    } else if (password.length > 0 || confirmPassword.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchMessage("");
    }
  };

  const complete = async () => {
    const errors = {
      name: "",
      email: "",
      identify: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      errors.name = "이름을 입력해주세요.";
    }
    if (!email) {
      errors.email = "이메일을 입력해주세요.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "유효한 이메일 형식을 입력해주세요.";
      }

    if (!identify) {
      errors.identify = "아이디를 입력해주세요.";
    } else if (!isIdChecked) {
      errors.identify = "아이디 중복 확인이 필요합니다.";
    }
    if (!password) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    if (passwordErrorMessage) {
      errors.password = passwordErrorMessage;
    }
    if (!confirmPassword) {
      errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    }

    if (Object.values(errors).some(error => error !== "")) {
      setErrorMessages(errors);
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            username: identify,
            password,
          }),
        });

        if (response.ok) {
          setShowModal(true);
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
          setIdMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('Error:', error);
        setIdMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className={styles.Container}>
      <Back/>
      <div className={styles.Form}>
        <div className={styles.Name}>
          <p className={styles.NLabel}>이름을 입력해주세요</p>
          <input
            className={styles.Input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessages.name && <p className={styles.ErrorMessage}>{errorMessages.name}</p>}
        </div>
  
        <div className={styles.Email}>
          <p className={styles.ELabel}>이메일을 입력해주세요</p>
          <input
            className={styles.Input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessages.email && <p className={styles.ErrorMessage}>{errorMessages.email}</p>}
        </div>
  
        <div className={styles.ID}>
          <p className={styles.ILabel}>아이디를 입력해주세요</p>
          <input
            className={styles.Input}
            type="text"
            value={identify}
            onChange={(e) => setIdentify(e.target.value)}
          />
          <div className={styles.Wrapper}>
            <p style={idMessage==="사용 가능한 아이디입니다."&&errorMessages.identify===''?{color:"green"}:{}} className={styles.ErrorMessage}>{idMessage&&errorMessages.identify===''?idMessage:errorMessages.identify}</p>
            <div className={styles.viewWrapper}>
              <div className={styles.ButtonContainer}>
                <button className={styles.ButtonInline} onClick={handleIdCheck}>중복확인</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.PW}>
          <p className={styles.SLabel}>비밀번호를 입력해주세요</p>
          <input
            className={styles.Input}
            type={isChecked ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <div className={styles.CheckboxContainer}>
            <div className={styles.Wrapper}>
              <p className={styles.ErrorMessage}>{errorMessages.password}{passwordErrorMessage && !errorMessages.password}</p>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className={styles.Saw}>비밀번호 보기</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className={styles.RPW}>
          <p className={styles.RLabel}>비밀번호를 다시 입력해주세요</p>
          <input
            className={styles.Input}
            type={returnChecked ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className={styles.CheckboxContainer}>
            <div className={styles.Wrapper}>
              <p className={styles.ErrorMessage}>{errorMessages.confirmPassword}</p>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={returnChecked}
                  onChange={returnCheckboxChange}
                />
                <p className={styles.Saw}>비밀번호 보기</p>  
              </div>
            </div>
          </div>
        </div>
  
        <div className={styles.Membershipbutton}>
          <button className={styles.Button} onClick={complete}>회원가입 완료</button>
        </div>
      </div>
      {showModal&&
        <Modal
          message="회원가입이 완료되었습니다!"
          onClose={()=>{setShowModal(false); navigate('/');}}
        />
      }
    </div>
  );
  
}

export default Mempage;