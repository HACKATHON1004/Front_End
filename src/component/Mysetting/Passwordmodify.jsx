import React, { useState, useRef } from 'react';
import styles from '../../cssModule/Passwordmodify.module.css';
import axios from 'axios';
import Back from '../Button/Back';
import Cookies from 'js-cookie';

export default function PasswordChange() {
  const [isCheckedCurrent, setIsCheckedCurrent] = useState(false);
  const [isCheckedNew, setIsCheckedNew] = useState(false);
  const [isCheckedConfirm, setIsCheckedConfirm] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const currentPwRef = useRef();
  const newPwRef = useRef();
  const confirmPwRef = useRef();

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

  const handleCheckboxChangeCurrent = () => {
    setIsCheckedCurrent(!isCheckedCurrent);
  };

  const handleCheckboxChangeNew = () => {
    setIsCheckedNew(!isCheckedNew);
  };

  const handleCheckboxChangeConfirm = () => {
    setIsCheckedConfirm(!isCheckedConfirm);
  };

  const handleCurrentPasswordChange = () => {
    const password = currentPwRef.current.value;
    const errorMessage = validatePassword(password);
    setIsCurrentPasswordValid(!errorMessage);
    setPasswordErrorMessage(errorMessage);
  };

  const handleNewPasswordChange = () => {
    const password = newPwRef.current.value;
    const errorMessage = validatePassword(password);
    setIsNewPasswordValid(!errorMessage);
    setPasswordErrorMessage(errorMessage);
  };

  const handleConfirmPasswordChange = () => {
    const password = confirmPwRef.current.value;
    const newPassword = newPwRef.current.value;
    const matchMessage = password !== newPassword ? "비밀번호가 일치하지 않습니다." : "";
    setIsPasswordConfirmed(!matchMessage);
    setPasswordMatchMessage(matchMessage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await axios.patch('https://real-east.shop/user', {
        currentPassword: currentPwRef.current.value,
        newPassword: newPwRef.current.value
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }

      
      console.log('Password changed successfully');
    } catch (error) {
      
      setError(error.message);
    }
  };
  console.log(handleSubmit)

  return (
    <div className={styles.Container}>
      <Back />
      <form className={styles.Form} >
        <div className={styles.CPW}>
          <p className={styles.CLabel}>현재 비밀번호</p>
          <input
            className={styles.Input}
            type={isCheckedCurrent ? "text" : "password"}
            ref={currentPwRef}
            onChange={handleCurrentPasswordChange}
          />
          <div className={styles.CheckboxContainer}>
            <div className={styles.CWrapper}>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isCheckedCurrent}
                  onChange={handleCheckboxChangeCurrent}
                />
                <p className={styles.Saw}>비밀번호 보기</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.PW}>
          <p className={styles.Label}>새 비밀번호</p>
          <input
            className={styles.Input}
            type={isCheckedNew ? "text" : "password"}
            ref={newPwRef}
            onChange={handleNewPasswordChange}
          />
          <div className={styles.CheckboxContainer}>
            <div className={styles.Wrapper}>
              <p className={styles.ErrorMessage}>{passwordErrorMessage}</p>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isCheckedNew}
                  onChange={handleCheckboxChangeNew}
                />
                <p className={styles.Saw}>비밀번호 보기</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.NPW}>
          <p className={styles.NLabel}>새 비밀번호 확인</p>
          <input
            className={styles.Input}
            type={isCheckedConfirm ? "text" : "password"}
            ref={confirmPwRef}
            onChange={handleConfirmPasswordChange}
          />
          <div className={styles.CheckboxContainer}>
            <div className={styles.Wrapper}>
              <p className={styles.ErrorMessage}>{passwordMatchMessage}</p>
              <div className={styles.viewWrapper}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={isCheckedConfirm}
                  onChange={handleCheckboxChangeConfirm}
                />
                <p className={styles.Saw}>비밀번호 보기</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button onClick={handleSubmit}
            className={styles.Button}
            
            disabled={!(isCurrentPasswordValid && isNewPasswordValid && isPasswordConfirmed)}
          >
            변경하기
          </button>
        </div>
      </form>
      {error && <p className={styles.Error}>{error}</p>}
    </div>
  );
}