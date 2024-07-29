import React, { useState } from 'react';
import '../App.css';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identify, setIdentify] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(false);
  const [idMessage, setIdMessage] = useState("");

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
      const response = await fetch(`http://3.38.255.77:8080/api/members/${identify}`);
      const data = await response.json();
      console.log(data);
      if (data.exists) {
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
        const response = await fetch('http://3.38.255.77:8080/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            identify,
            password,
          }),
        });

        if (response.ok) {
          const newWindow = window.open("", "_blank", "width=400,height=200");
          newWindow.document.write(`
            <html>
              <head>
                <style>
                  body {
                    font-family: 'PretendardVariable', sans-serif;
                    text-align: center;
                    padding: 20px;
                  }
                </style>
              </head>
              <body>
                <p>회원가입을 완료하였습니다. 반갑습니다, ${name}님!</p>
              </body>
            </html>
          `);
          newWindow.document.close();
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
    <div className="Container">
      <div className="Form">
        <div className='Name'>
          <p className="NLabel">이름을 입력해주세요</p>
          <input
            className="Input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessages.name && <p className="ErrorMessage">{errorMessages.name}</p>}
        </div>

       <div className='Email'>
        <p className="ELabel">이메일을 입력해주세요</p>
          <input
            className="Input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessages.email && <p className="ErrorMessage">{errorMessages.email}</p>}
       </div>

       <div className='ID'>
        <p className="ILabel">아이디를 입력해주세요</p>
          <input
            className="Input"
            type="text"
            value={identify}
            onChange={(e) => setIdentify(e.target.value)}
          />
          <div className='Wrapper'>
            <p className='ErrorMessage'>{errorMessages.identify}</p>
            <div className='viewWrapper'>
              <div className="ButtonContainer">
              <button className="ButtonInline" onClick={handleIdCheck}>중복확인</button>
            </div>
            </div>
          </div>
       </div>
        
       <div className='PW'>
        <p className="SLabel">비밀번호를 입력해주세요</p>
          <input
            className="Input"
            type={isChecked ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="CheckboxContainer">
            <div className='Wrapper'>
              <p className="ErrorMessage">{errorMessages.password}{passwordErrorMessage && !errorMessages.password}</p>
              <div className='viewWrapper'>
                <input
                className="Checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                />
                <p className="Saw">비밀번호 보기</p>
              </div>
            </div>
          </div>
       </div>

        <div className='RPW'>
          <p className="RLabel">비밀번호를 다시 입력해주세요</p>
          <input
            className="Input"
            type={returnChecked ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="CheckboxContainer">
            <div className='Wrapper'>
                <p className="ErrorMessage">{errorMessages.confirmPassword}</p>
                <div className='viewWrapper'>
                  <input
                      className="Checkbox"
                      type="checkbox"
                      checked={returnChecked}
                      onChange={returnCheckboxChange}
                  />
                  <p className="Saw">비밀번호 보기</p>  
                </div>
            </div>
          </div>
        </div>

        <div className='Membershipbutton'>
          <button className="Button" onClick={complete}>회원가입 완료</button>
        </div>
      </div>
    </div>
  );
}

export default App;