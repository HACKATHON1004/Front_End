import axios from 'axios';
import styles from '../../../cssModule/postContent.module.css';
import cookie from 'js-cookie';

export default function FP_RecBtns({postId}) {
    function handleRecoomend() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/recommend/${postId}`,{
            recommendType: "1"
        },{
            headers: {
                Authorization: cookie.get("token")
            }
        })
    }

    function handleNotRecommend() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/recommend/${postId}`,{
            recommendType: "-1"
        },{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                console.log(res.data);
            })
    }
    
    return (
        <>
            <div className={styles.btnWrapper}>
                <button onClick={handleRecoomend} className={styles.recBtn}>추천</button>
                <button onClick={handleNotRecommend} className={styles.notRecBtn}>비추천</button>
            </div>
        </>
    )
}