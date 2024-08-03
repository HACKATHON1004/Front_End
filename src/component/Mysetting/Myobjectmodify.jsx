import React, { useState } from 'react';
import styles from '../../cssModule/mypmodify.module.css';
import axios from 'axios';  
import Back from '../Button/Back';
import Cookies from 'js-cookie'


function App() {
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [disability, setDisability] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [limbDisability, setLimbDisability] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [intensity, setIntensity] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isguardian, setisGuardian] = useState(''); 

  const handleNicknameCheck = async () => {
    try {
      const response = await fetch(`https://real-east.shop/userinfo`);
      const data = await response.json();
      if (data.exists) {
        setNicknameMessage('이미 사용중인 닉네임입니다.');
        setIsNicknameChecked(false);
      } else {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (error) {
      setNicknameMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setIsNicknameChecked(false);
    }
  };
console.log(handleNicknameCheck)
  const handleSubmit = async () => {
    setNicknameErrorMessage('');

    if (!isNicknameChecked) {
      setNicknameErrorMessage('닉네임 중복확인을 해주세요.');
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.patch('https://real-east.shop/userinfo', {
        nickname,
        age,
        sex: gender,
        disabilityCF: disability,
        disabilityK: disabilityType,
        disabilityKK: limbDisability,
        exerciseKind: favoriteSport,    
        exerciseIntensity: intensity,
        isguardian,
      }, {
        headers: {
         
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im9rIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyMjY5NDIzMCwiZXhwIjoxNzIyNzAxNDMwfQ.arj08s5pGOcaIAakLPSkiDNwAriluJ-7Ip2Dsi38yMA`,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        console.log('수정 성공');
      } else {
        console.log('수정 실패');
      }
      } catch (error) {
        console.error('서버 요청 실패:', error);
      }
  };

  return (
    <div className={styles.Modifycontainer}>
       <Back /> 
      {/* 닉네임 섹션 */}
      <div className={styles.Form}>
        <div className={styles.NWapper}>
          <div className={styles.Nmodify}>닉네임</div>
          <div className={styles.Ninput}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.NinputField}
            />
            <div className={styles.NBwapper}>
              <div className={styles.Nerror}>{nicknameErrorMessage} {nicknameMessage && !nicknameErrorMessage}</div>
              <button className={styles.NButton} onClick={handleNicknameCheck}>중복확인</button>
            </div>
          </div>
        </div>

        {/* 나이 섹션 */}
        <div className={styles.AWapper}>
          <div className={styles.Amodify}>나이</div>
          <div className={styles.Ainput}>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={styles.AinputField}
            />
          </div>
        </div>

        {/* 성별 선택 섹션 */}
        <div className={styles.GWapper}>
          <div className={styles.Gender}>성별</div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.Gselect}
          >
            <option value="">성별 선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        {/* 장애 분류 섹션 */}
        <div className={styles.DWapper}>
          <div className={styles.Dis}>장애 분류</div>
          <div className={styles.DisWapper}>
            <select
              value={disability}
              onChange={(e) => {
                setDisability(e.target.value);
                setDisabilityType('');
                setLimbDisability('');
              }}
              className={styles.Dselect}
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
                  className={styles.Dselect}
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
                className={styles.Dselect}
              >
                <option value="">{disabilityType === '상지 장애' ? '상지 종류' : '하지 종류'}</option>
                <option value="절단">절단</option>
                <option value="기능">기능</option>
                <option value="관절">관절</option>
              </select>
            )}
          </div>
        </div>

        {/* 좋아하는 운동 종류 선택 섹션 */}
        <div className={styles.FSWapper}>
          <div className={styles.FSport}>좋아하는 운동 종류를 선택해주세요</div>
          <select
            value={favoriteSport}
            onChange={(e) => setFavoriteSport(e.target.value)}
            className={styles.FSportselect}
          >
            <option value="">운동 종류</option>
            <option value="근력">근력</option>
            <option value="유산소">유산소</option>
            <option value="유연성">유연성</option>
            <option value="수상운동">수상운동</option>
            <option value="구기">구기</option>
          </select>
        </div>

        {/* 원하는 운동 강도 선택 섹션 */}
        <div className={styles.WSWapper}>
          <div className={styles.WSport}>원하는 운동 강도를 선택해주세요</div>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className={styles.WSportselect}
          >
            <option value="">운동 강도</option>
            <option value="저강도">저강도</option>
            <option value="고강도">고강도</option>
          </select>
        </div>

        {/* 보호자 여부 선택 섹션 */}
        <div className={styles.PWapper}>
          <div className={styles.Parent}>보호자 여부를 선택해주세요</div>
          <select
            value={isguardian}
            onChange={(e) => setisGuardian(e.target.value)}
            className={styles.guardianselect}
          >
            <option value="">선택</option>
            <option value="O">O</option>
            <option value="X">X</option>
          </select>
        </div>

        {/* 수정하기 버튼 */}
        <div className={styles.modifyWapper}>
          <button className={styles.modifyButton} onClick={handleSubmit}>수정하기</button>
        </div>
      </div>
    </div>
  );
}

export default App;