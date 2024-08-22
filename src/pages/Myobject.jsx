import React, { useState } from 'react';
import styles from '../cssModule/myp.module.css';
import '../App.css';

function App() {
  const [nickname, setNickname] = useState(''); // 닉네임 변수
  const [idMessage, setIdMessage] = useState(''); // 닉네임이 사용 중인지 아닌지를 알려주는 변수
  const [isIdChecked, setIsIdChecked] = useState(false); // 닉네임 사용 중인지 아닌지를 체크하는 변수
  const [age, setAge] = useState(''); // 나이 변수
  const [gender, setGender] = useState(''); // 성별 변수
  const [disability, setDisability] = useState(''); // 장애 분류 변수
  const [disabilityType, setDisabilityType] = useState(''); // 장애 종류 변수
  const [limbDisability, setLimbDisability] = useState(''); // 신체적 장애 변수
  const [sports, setSports] = useState({
    근력: false,
    유산소: false,
    유연성: false,
    수상운동: false,
    구기: false,
  });
  const [intensity, setIntensity] = useState(''); // 원하는 운동 강도 선택 변수

  const handleSportsChange = (e) => {
    const { name, checked } = e.target;
    setSports({ ...sports, [name]: checked });
  };

  const handleIdCheck = async () => {
    try {
      const response = await fetch(`http://3.38.255.77:8080/api/members/${nickname}`);
      const data = await response.json();
      console.log(data);
      if (data.exists) {
        setIdMessage('이미 사용중인 닉네임입니다.');
        setIsIdChecked(false);
      } else {
        setIdMessage('사용 가능한 닉네임입니다.');
        setIsIdChecked(true);
      }
    } catch (error) {
      setIdMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setIsIdChecked(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      setIdMessage('닉네임 중복 확인을 해주세요.');
      return;
    }
    // Handle form submission
    // 예: 서버로 데이터를 전송하거나 폼 데이터를 검증하는 코드 추가
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.Nlabel}>닉네임을 입력해주세요</div>
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIdMessage('');
            setIsIdChecked(false); // 닉네임이 변경될 때 중복 확인 결과 초기화
          }}
        />
        <div className={styles.idMessage}>
          {idMessage && <p>{idMessage}</p>}
          <button type="button" className={styles.confirmButton} onClick={handleIdCheck}>
            중복확인
          </button>
        </div>

        <div className={styles.Alabel}>나이를 입력해주세요</div>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

        <div className={styles.Glabel}>성별을 선택해주세요</div>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
            <select value={limbDisability} onChange={(e) => setLimbDisability(e.target.value)}>
              <option value="">
                {disabilityType === '상지 장애' ? '상지 종류' : '하지 종류'}
              </option>
              <option value="절단">절단</option>
              <option value="기능">기능</option>
              <option value="관절">관절</option>
            </select>
          )}
        </div>

        <div className={styles.Llabel}>좋아하는 운동 종류를 선택해주세요</div>
        <div className={styles.pentagonContainer}>
          <div className={styles.pentagon}>
            {/* <div className={styles.labelContainer}>
              <div className={`${styles.label} ${styles.label1}`}>근력</div>
              <div className={`${styles.label} ${styles.label2}`}>유산소</div>
              <div className={`${styles.label} ${styles.label3}`}>유연성</div>
              <div className={`${styles.label} ${styles.label4}`}>수상운동</div>
              <div className={`${styles.label} ${styles.label5}`}>구기</div>
            </div> */}
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
        </div>

        <div className={styles.Wlabel}>원하는 운동 강도를 선택해주세요</div>
        <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
          <option value="">운동 강도</option>
          <option value="고강도">고강도</option>
          <option value="저강도">저강도</option>
        </select>

        <button type="submit" className={styles.button}>
          등록 완료
        </button>
      </form>
    </div>
  );
}

export default App;
