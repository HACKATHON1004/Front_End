import React, { useState, useRef, useEffect } from 'react';
import styles from '../cssModule/Passwordmodify.module.css';
import '../App.css';
import axios from 'axios';

export default function PasswordChange() {
  const currentPwRef = useRef();
  const newPwRef = useRef();
  const confirmPwRef = useRef();
  const [isCheckedCurrent, setIsCheckedCurrent] = useState(false);
  const [isCheckedNew, setIsCheckedNew] = useState(false);
  const [isCheckedConfirm, setIsCheckedConfirm] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  useEffect(() => {
    // Fetch the current password from the server when the component mounts
    fetch('/api/current-password')
      .then(response => response.json())
      .then(data => setCurrentPassword(data.password))
      .catch(error => console.error('현재 비밀번호를 가져오는 중 오류 발생:', error));
  }, []);

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

  const handleCurrentPasswordChange = (e) => {
    const enteredCurrentPassword = e.target.value;
    setIsCurrentPasswordValid(enteredCurrentPassword === currentPassword);
  };

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    const validationMessage = validatePassword(newPassword);
    setPasswordErrorMessage(validationMessage);
    setIsNewPasswordValid(validationMessage === "");
    checkPasswordMatch(newPassword, confirmPwRef.current.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    checkPasswordMatch(newPwRef.current.value, newConfirmPassword);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword && password.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirmed(true);
    } else if (password.length > 0 || confirmPassword.length > 0) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirmed(false);
    } else {
      setPasswordMatchMessage("");
      setIsPasswordConfirmed(false);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCurrentPassword = currentPwRef.current.value;

    // Check if the entered current password matches the fetched current password
    if (enteredCurrentPassword !== currentPassword) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    const newPassword = newPwRef.current.value;

    // Send the new password to the backend
    try {
      const response = await axios.post('/api/change-password', { newPassword });
      console.log('비밀번호 변경 완료:', response.data);
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSubmit}>
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
          <button
            className={styles.Button}
            type="submit"
            disabled={!(isCurrentPasswordValid && isNewPasswordValid && isPasswordConfirmed)}
          >
            변경하기
          </button>
        </div>
      </form>
    </div>
  );
}