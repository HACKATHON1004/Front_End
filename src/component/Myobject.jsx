import { useState } from 'react';
import styles from '../cssModule/myp.module.css';
import axios from 'axios';

function App() {
  const [nickname, setNickname] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [disability, setDisability] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [limbDisability, setLimbDisability] = useState('');
  const [sports, setSports] = useState({
    근력: false,
    유산소: false,
    유연성: false,
    수상운동: false,
    구기: false,
  });
  const [intensity, setIntensity] = useState('');

  const handleSportsChange = (e) => {
    const { name, checked } = e.target;
    setSports({ ...sports, [name]: checked });
  };

  const handleIdCheck = async () => {
    try {
      const response = await fetch(`http://54.180.230.63:8080/nickname/${nickname}`);
      const data = await response.json();
      if (data.exists) {
        setIdMessage("이미 사용중인 닉네임입니다.");
        setIsIdChecked(false);
      } else {
        setIdMessage("사용 가능한 닉네임입니다.");
        setIsIdChecked(true);
      }
    } catch (error) {
      setIdMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      setIdMessage("닉네임 중복 확인을 해주세요.");
      return;
    }

    const formData = {
      nickname,
      age,
      gender,
      disability,
      disabilityType,
      limbDisability,
      sports: Object.keys(sports).filter(key => sports[key]),
      intensity,
    };

    try {
      const response = await axios.post('http://54.180.230.63:8080/userInfo',formData, {
        headers: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE3MjIwOTkwODEsImV4cCI6MTcyMjA5OTExN30.KfCqrS3f1macamIJSNxvb1uwBOGmz1H844BMpN4lXhI',
       
      });

      if (response.ok) {
        console.log("데이터 전송 성공");
        resetFormStates();
      } else {
        console.error("데이터 전송 실패");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류 발생", error);
    }
  };

  const resetFormStates = () => {
    setNickname('');
    setAge('');
    setGender('');
    setDisability('');
    setDisabilityType('');
    setLimbDisability('');
    setSports({
      근력: false,
      유산소: false,
      유연성: false,
      수상운동: false,
      구기: false,
    });
    setIntensity('');
    setIdMessage('');
    setIsIdChecked(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.Nickname}>
          <div className={styles.Nlabel}>닉네임을 입력해주세요</div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIdMessage('');
              setIsIdChecked(false);
            }}
          />
          <div className={styles.NWapper}>
            <div className={styles.idMessage}>
              {idMessage && <p>{idMessage}</p>}
            </div>
            <div className={styles.ViewNWapper}>
              <button type="button" className={styles.confirmButton} onClick={handleIdCheck}>중복확인</button>
            </div>
          </div>
        </div>

        <div className={styles.Alabel}>나이를 입력해주세요</div>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <div className={styles.Glabel}>성별을 선택해주세요</div>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">성별</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>

        <div className={styles.Dlabel}>장애 분류</div>
        <div className={styles.disableWrapper}>
          <select
            value={disability}
            onChange={(e) => {
              setDisability(e.target.value);
              setDisabilityType('');
              setLimbDisability('');
            }}
          >
            <option value="">장애 분류</option>
            <option value="정신적 장애">정신적 장애</option>
            <option value="신체적 장애">신체적 장애</option>
          </select>

          {disability === '신체적 장애' && (
            <>
              <select
                value={disabilityType}
                onChange={(e) => {
                  setDisabilityType(e.target.value);
                  setLimbDisability('');
                }}
              >
                <option value="">장애 종류</option>
                <option value="상지 장애">상지 장애</option>
                <option value="하지 장애">하지 장애</option>
                <option value="척추 장애">척추 장애</option>
                <option value="심장 장애">심장 장애</option>
                <option value="변형 장애">변형 장애</option>
                <option value="청각 장애">청각 장애</option>
                <option value="시각 장애">시각 장애</option>
              </select>
            </>
          )}

          {(disabilityType === '상지 장애' || disabilityType === '하지 장애') && (
            <select
              value={limbDisability}
              onChange={(e) => setLimbDisability(e.target.value)}
            >
              <option value="">{disabilityType === '상지 장애' ? '상지 종류' : '하지 종류'}</option>
              <option value="절단">절단</option>
              <option value="기능">기능</option>
              <option value="관절">관절</option>
            </select>
          )}
        </div>

        <div className={styles.Llabel}>좋아하는 운동 종류를 선택해주세요</div>
        <div className={styles.pentagon}>
          <div className={styles.checkGroup}>
            {Object.keys(sports).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={sports[key]}
                  onChange={handleSportsChange}
                />
                {key}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.Wlabel}>원하는 운동 강도를 선택해주세요</div>
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        >
          <option value="">운동 강도</option>
          <option value="고강도">고강도</option>
          <option value="저강도">저강도</option>
        </select>

        <button type="submit" className={styles.button}>등록 완료</button>
      </form>
    </div>
  );
}
export default App;