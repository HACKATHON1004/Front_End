import styles from '../../cssModule/placeReviewContent.module.css'
import img1 from '../../images/findCat.svg'
import img2 from '../../images/location.svg'
import img3 from '../../images/search.svg';
import img4 from '../../images/pencil.svg'
import img5 from '../../images/close.svg'
import CmtModalStar from '../CmtModalStar'
import Back from '../Button/Back';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cookie from 'js-cookie'

export default function PlaceReviewContent() {
    const param = useParams();
    const placeId = param.id;
    const inputRef = useRef();
    
    const [reviewData, setReviewData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    console.log(reviewData);
    const handleClear = () => {
        inputRef.current.value = '';
        setDoesSearch(false);
      };

    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}`)
        .then(res=>{
          setReviewData(res.data);
        })

      axios.get(`${import.meta.env.VITE_SERVER_URL}/review/place/${placeId}`)
        .then(res=>{
          setReviews(res.data);
        })

        axios.get(`${import.meta.env.VITE_SERVER_URL}/user/username`,{
          headers:{
              Authorization: cookie.get("token")
          }
      })
          .then(res=>{
              setUsername(res.data.username);
          })
          .catch(()=>{
              console.log("그딴거 없음");
          })
    }, [])
    
      function handleSearch() {
        setSearch(inputRef.current.value);
        setSearch2('라어낸');
        setDoesSearch(false);
      }
    // const reviews = [
    //     { id: 'eex', review: '장애인 이용자를 위한 전문 인력이 배치되어 있어 안전하게 수영했습니다!!' },
    //     { id: 'tuu', review: '물빛수영장은 휠체어 사용자들이 쉽게 접근할 수 있도록 엘리베이터, 장애인 전용 화장실, 넓은 출입구 등 다양한 편의시설이 있어서 좋았어요!' },
    //     { id: 'rr2', review: '개인 맞춤형 수영 지도를 받아서 좋았습니다ㅎㅎ' },
    //     { id: 'uzp', review: '장애인을 위한 특별 수영 프로그램과 재활 프로그램이 잘 되어 있어서 저는 도움을 많이 받았어요!! 추천합니다~~' },
    //     { id: 'c06', review: '장애인 주차구역이 있어서 주차가 편리한 곳,,!!' },
    //   ];
    

    return (
        reviewData&&<>
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
                        <span className={styles.title}>{reviewData.placeName}</span>
                        <img src={img2} />
                        <span className={styles.location}>{reviewData.address}</span>
                    </div>
                    <div className={styles.reviewInfo}>
                        <span className={styles.rating}>&#9733; {reviewData.starAvg&&reviewData.starAvg.toFixed(2)}</span> {/* 별표 유니코드 사용 */}
                        <span className={styles.reviewCount}>방문자리뷰 {reviews.length}</span>
                    </div>
                    <CmtModalStar msg="리뷰를 남겨보세요." username={username} postId={placeId} />
                </div>
                <div className={styles.reviewList}>
                    {reviews.map((item, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <div className={styles.userInfo}>
                                <div className={styles.userIcon}>👤</div>
                                <span className={styles.userId}>{item.username.slice(0,3)}***</span>
                            </div>
                            <div className={styles.userReviewWrapper}>
                                <p className={styles.userReview}>{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                    <Modal
                        message="리뷰가 등록되었습니다."
                        onClose={()=>navigate(0)}
                    />
                )}
      </div>
    </>
    )
}