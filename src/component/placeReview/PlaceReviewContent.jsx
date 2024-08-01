import styles from '../../cssModule/placeReviewContent.module.css'
import img1 from '../../images/findCat.svg'
import img2 from '../../images/location.svg'
import img3 from '../../images/search.svg';
import img4 from '../../images/pencil.svg'
import img5 from '../../images/close.svg'
import CmtModal from "../Post/CmtModal";
import Back from '../Button/Back';
import { useRef, useState } from 'react';

export default function PlaceReviewContent({id}) {
    const inputRef = useRef();
    const handleClear = () => {
        inputRef.current.value = '';
        setDoesSearch(false);
      };
    
      function handleSearch() {
        setSearch(inputRef.current.value);
        setSearch2('라어낸');
        setDoesSearch(false);
      }
    const reviews = [
        { id: 'eex', review: '장애인 이용자를 위한 전문 인력이 배치되어 있어 안전하게 수영했습니다!!' },
        { id: 'tuu', review: '물빛수영장은 휠체어 사용자들이 쉽게 접근할 수 있도록 엘리베이터, 장애인 전용 화장실, 넓은 출입구 등 다양한 편의시설이 있어서 좋았어요!' },
        { id: 'rr2', review: '개인 맞춤형 수영 지도를 받아서 좋았습니다ㅎㅎ' },
        { id: 'uzp', review: '장애인을 위한 특별 수영 프로그램과 재활 프로그램이 잘 되어 있어서 저는 도움을 많이 받았어요!! 추천합니다~~' },
        { id: 'c06', review: '장애인 주차구역이 있어서 주차가 편리한 곳,,!!' },
      ];
      console.log(id);

    return (
        <>
      <Back />
      <div className={styles.pageWrapper}>
        <div className={styles.title2}>
          <div>
            <img src={img4} />
          </div>
          <div>
            <span>장소 리뷰</span>
          </div>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="장소를 입력해 주세요."
            ref={inputRef}
            className={styles.inputField}
          />
          <img src={img5} onClick={handleClear} className={styles.iconButton} />
          <img src={img3} onClick={handleSearch} className={styles.iconButton} />
        </div>
        <div className={styles.bodyWrapper}>
                <div className={styles.title}>
                    <img src={img1}/>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.title}>물빛수영장</span>
                        <img src={img2} />
                        <span className={styles.location}>서울 성북구 길음7로 20</span>
                    </div>
                    <div className={styles.reviewInfo}>
                        <span className={styles.rating}>&#9733; 4.14</span> {/* 별표 유니코드 사용 */}
                        <span className={styles.reviewCount}>방문자리뷰 552</span>
                    </div>
                    <CmtModal msg="리뷰를 남겨보세요."/>
                </div>
                <div className={styles.reviewList}>
                    {reviews.map((item, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <div className={styles.userInfo}>
                                <div className={styles.userIcon}>👤</div>
                                <span className={styles.userId}>{item.id}***</span>
                            </div>
                            <div className={styles.userReviewWrapper}>
                                <p className={styles.userReview}>{item.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </div>
    </>
    )
}