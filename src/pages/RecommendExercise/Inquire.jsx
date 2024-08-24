import React, { useEffect, useState } from 'react';
import styles from '../../cssModule/inquire.module.css'
import Back from '../../\bcomponents/Button/Back';
import write from '../../images/write.svg'
import cookie from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InquireList from '../../\bcomponents/inquire/InquireList';

export default function Inquire() {
    const [comments, setData] = useState([]);
    const navigate = useNavigate();
    const [isCoach, setIsCoach] = useState(false);

    useEffect(()=>{
      if(cookie.get("isCoach")==="true"){
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach`)
          .then(res=>{
            setData(res.data);
          })
      }
      else {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach/username`,{
          headers: {
              Authorization: cookie.get("token")
          }
      })
          .then(res=>{
              setData(res.data);
          })
      }     
        setIsCoach(cookie.get("isCoach"));
    }, [])
  
    return (
    <>
      <Back />
      <div className={styles.pageWrapper}>
        <div>
          Q&A with Coach
        </div>
        <div className={styles.btnWrapper}>
            {isCoach&&isCoach==="true"?(<></>):(<button onClick={()=>navigate('post')} className={styles.postBtn}>
                <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                <span>질문하기</span>
            </button>)}
        </div>
        <InquireList comments={comments}/>
      </div>
    </>
  );
}
