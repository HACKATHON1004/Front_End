import { useEffect, useState } from 'react';
import styles from '../../cssModule/inquirePostContent.module.css';
import axios from 'axios';
import profileImage from '../../images/1.svg';

export default function AnswerPost({inquireId, token, isCoach}) {
    const [coachCmt, setCoachCmt] = useState([]);
    
    useEffect(()=>{ ///엔드포인트 넣어야댐
        axios.get(`${import.meta.env.VITE_SERVER_URL}/cpcomment/coachPost/${inquireId}`, {
            headers: {
                Authorization: token
            }
        })
            .then(res=>{
                setCoachCmt(res.data);
            })
    }, [])
    
    return (
        <>
            {coachCmt.length > 0?(
            <div className={styles.inquireWrapper}>
                <div className={styles.headerWrapper}>
                    <img 
                    style={{width:"29px", height:"29px"}}
                    src={profileImage} 
                    alt="User Profile" 
                    className={styles.profileImage} 
                    />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>{coachCmt[0].name} 코치</span>
                        <span className={styles.createDate}>{coachCmt[0].createDate&&coachCmt[0].createDate.split("T").join(" ").slice(0,16)}</span>
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>{coachCmt[0].content}</div>
                </div>
            </div>):<></>}
        </>
    )
}