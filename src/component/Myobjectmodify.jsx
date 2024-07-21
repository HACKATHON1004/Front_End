import React, { useState } from 'react';
import styles from '../cssModule/mypmodify.module.css';
import '../App.css';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [disability, setDisability] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [limbDisability, setLimbDisability] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [intensity, setIntensity] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [gender, setGender] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRePassword = () => setShowRePassword(!showRePassword);

  const handleNicknameCheck = async () => {
    try {
      const response = await fetch(`http://3.38.255.77:8080/api/members/${nickname}`);
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

  const handleSubmit = () => {
    setPasswordErrorMessage('');
    setNicknameErrorMessage('');

    if (password !== rePassword) {
      setPasswordErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isNicknameChecked) {
      setNicknameErrorMessage('닉네임 중복확인을 해주세요.');
      return;
    }
    // 여기서 수정하기 로직을 추가하면 됩니다.
    console.log('수정 성공');
  };

  return (
    <div className={styles.Modifycontainer}>
      {/* 비밀번호 섹션 */}
      <div className={styles.PWWapper}>
        <div className={styles.PWmodify}>비밀번호</div>
        <div className={styles.PWinput}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.PWinputField}
          />
          <div className={styles.PWview}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <p className={styles.PWS}>비밀번호 보기</p>
          </div>
        </div>
      </div>

      {/* 비밀번호 재확인 섹션 */}
      <div className={styles.RPWapper}>
        <div className={styles.RPWmodify}>비밀번호 재확인</div>
        <div className={styles.RPWinput}>
          <input
            type={showRePassword ? 'text' : 'password'}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className={styles.RPWinputField}
          />
          <div className={styles.RPWview}>
            <input
              type="checkbox"
              checked={showRePassword}
              onChange={toggleShowRePassword}
            />
            <p className={styles.PWS}>비밀번호 보기</p>
          </div>
        </div>
      </div>

      {/* 비밀번호 오류 메시지 섹션 */}
      {passwordErrorMessage && <div className={styles.errorMessage}>{passwordErrorMessage}</div>}

      {/* 닉네임 섹션 */}
      <div className={styles.NWapper}>
        <div className={styles.Nmodify}>닉네임</div>
        <div className={styles.Ninput}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={styles.NinputField}
          />
          <button className={styles.NButton} onClick={handleNicknameCheck}>
            중복확인
          </button>
        </div>
        <div className={styles.Nmessage}>
          {nicknameMessage}
        </div>
      </div>

      {/* 닉네임 오류 메시지 섹션 */}
      {nicknameErrorMessage && <div className={styles.errorMessage}>{nicknameErrorMessage}</div>}

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

      {/* 수정하기 버튼 */}
      <div className={styles.modifyWapper}>
        <button className={styles.modifyButton} onClick={handleSubmit}>수정하기</button>
      </div>
    </div>
  );
}

export default App;