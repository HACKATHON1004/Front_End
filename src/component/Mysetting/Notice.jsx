import React, { useEffect, useState } from 'react';
import styles from '../../cssModule/Notice.module.css'; // 실제 스타일시트 경로
import axios from 'axios';
import Noticesvg from "../../images/공지사항.svg";
import Servicesvg from "../../images/서비스 문의.svg";
import Back from '../Button/Back';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');

  useEffect(() => {
    // 백엔드에서 공지사항을 가져옴
    fetch('/api/notices')  // 실제 백엔드 엔드포인트로 변경하세요
      .then(response => response.json())
      .then(data => setNotices(data))
      .catch(error => console.error('공지사항을 가져오는 중 오류 발생:', error));
  }, []);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // 문의 데이터를 백엔드로 전송
    axios.post('/api/inquiries', { email, inquiryType, inquiryContent })
      .then(response => {
        console.log('문의가 제출되었습니다:', response.data);
        // 폼 리셋
        setEmail('');
        setInquiryType('');
        setInquiryContent('');
      })
      .catch(error => console.error('문의 제출 중 오류 발생:', error));
  };

  return (
    <div className={styles.container}>
      <Back/>
      <div className={styles.noticeSection}>
        <div className={styles.NoticeWapper}>
          <div className={styles.imgWapper}>
          <img src={Noticesvg} className={styles.imgNotice} alt="Noticesvg"></img>
          <div className={styles.NsectionTitle}>공지사항</div>
          </div>
                <div className={styles.Noticebox}>
                        {notices.map((notice, index) => (
                        <div key={index} className={styles.noticeItem}>
                        <div className={styles.noticeDate}>{notice.date}</div>
                        <div className={styles.noticeContent}>[공지사항] {notice.content}</div>
                    </div>
                    ))}
                </div>
                <div className={styles.Noticebox}>
                        {notices.map((notice, index) => (
                        <div key={index} className={styles.noticeItem}>
                        <div className={styles.noticeDate}>{notice.date}</div>
                        <div className={styles.noticeContent}>[공지사항] {notice.content}</div>
                    </div>
                    ))}
                </div>
                <div className={styles.Noticebox}>
                        {notices.map((notice, index) => (
                        <div key={index} className={styles.noticeItem}>
                        <div className={styles.noticeDate}>{notice.date}</div>
                        <div className={styles.noticeContent}>[공지사항] {notice.content}</div>
                    </div>
                    ))}
                </div>
                <div className={styles.Noticebox}>
                        {notices.map((notice, index) => (
                        <div key={index} className={styles.noticeItem}>
                        <div className={styles.noticeDate}>{notice.date}</div>
                        <div className={styles.noticeContent}>[공지사항] {notice.content}</div>
                    </div>
                    ))}
                </div>
        </div>
      </div>
      <div className={styles.inquirySection}>
        <div className={styles.SeriveWapper}>
        <div className={styles.img1Wapper}>
        <img src={Servicesvg} className={styles.imgService} alt="Servicesvg"></img>
        <div className={styles.SsectionTitle}>서비스 문의</div>
        </div>
            <div className={styles.formGroup}>
                <div className={styles.Elabel}>이메일</div>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="답변 받으실 이메일을 입력해 주세요."
                required
                />
            </div>
            <div className={styles.formGroup}>
                <div className={styles.Nlabel}>문의 유형</div>
               <div>
                <select
                 className={styles.Nselect}
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  required
                  >
                  <option value="">유형을 선택해 주세요.</option>
                  <option value="회원정보문의">회원정보문의</option>
                  <option value="서비스 불편사항">서비스 불편사항</option>
                  <option value="기타문의">기타문의</option>
                  
                  </select>
               </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.Slabel}>내용</div>
                <textarea
                value={inquiryContent}
                onChange={(e) => setInquiryContent(e.target.value)}
                placeholder="문의 내용을 입력해 주세요. 
확인 후 빠르게 답변 드리겠습니다."
                required
                ></textarea>
            </div>
        </div>
         
      </div>
      <div className={styles.submitWapper}>
          <button onClick={handleInquirySubmit}type="submit" className={styles.submitButton}>제출</button>
        </div>
    </div>
  );
};

export default Notice;