import styles from '../../cssModule/placeReviewContent.module.css'
import img1 from '../../images/findCat.svg'
import img4 from '../../images/pencil.svg'
import CmtModalStar from '../CmtModalStar'
import Back from '../../\bcomponents/Button/Back';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import Modal from '../Modal'; // Ensure you import Modal component
import ReviewList from '../../\bcomponents/placeReview/ReviewList';
import ReviewContentHeader from './ReviewContentHeader'

export default function PlaceReviewContent() {
    const param = useParams();
    const placeId = param.id;
    
    const [reviewData, setReviewData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Add navigate

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}`)
            .then(res=>{
                setReviewData(res.data);
            });

        axios.get(`${import.meta.env.VITE_SERVER_URL}/review/place/${placeId}`)
        .then(res=>{
            setReviews(res.data);
        });

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
    }, [placeId]);
    
    return (
        reviewData && <>
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
                <div className={styles.bodyWrapper}>
                    <div className={styles.title}>
                        <img src={img1}/>
                    </div>
                    <div className={styles.container}>
                        <ReviewContentHeader reviewData={reviewData} reviews={reviews.length}/>
                        <CmtModalStar msg="리뷰를 남겨보세요." username={username} postId={placeId} />
                    </div>
                    <ReviewList reviews={reviews}/>
                </div>
                {showModal && (
                    <Modal
                        message="리뷰가 등록되었습니다."
                        onClose={() => navigate(0)} // Ensure navigate(0) reloads the page
                    />
                )}
            </div>
        </>
    )
}
