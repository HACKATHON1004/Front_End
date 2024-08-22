import styles from '../../cssModule/home.module.css'
import userCard from '../../images/user.svg'
import axios from "axios"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserInfo from '../../\bcomponents/home/UserInfo'
import cookies from 'js-cookie'
import HomeHeader from '../../\bcomponents/home/HomeHeader'
import HomeMenu from '../../\bcomponents/home/HomeMenu'

export default function Home() {
    // const isGuardian = axios.get("");
    const isGuardian = false;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/isCoach`,null,{
            headers: {
                Authorization: cookies.get("token")
            }
        })
            .then((res)=>{
                if(res.data===true){
                    cookies.set("isCoach", res.data);
                    axios.get(`${import.meta.env.VITE_SERVER_URL}/coachinfo/username`,{
                        headers: {
                            Authorization: cookies.get("token")
                        }
                    })
                        .then(res=>{
                            setUserInfo(res.data);
                        })
                }
                else {
                    axios.post(`${import.meta.env.VITE_SERVER_URL}/user/isFirstLogin`,null,{
                        headers: {
                            Authorization: cookies.get("token")
                        }
                    })
                        .then(res=>{
                            if(res.data===true){
                                navigate('/isCoach');
                            }
                            else {
                                axios.get(`${import.meta.env.VITE_SERVER_URL}/userinfo/username`,{
                                    headers: {
                                        Authorization: cookies.get("token")
                                    }
                                })
                                    .then(res=>{
                                        setUserInfo(res.data);
                                    })
                            }
                        })
                }
            })
    }, [])

    function handleLink(linkName) {
        navigate(`/${linkName}`);
    }

    return (
    <>
        <div className={styles.pageWrapper}>
            <HomeHeader userInfo={userInfo} />
            <div className={styles.infoWrapper}>
                <div className={styles.imgWrapper}>
                    <img src={userCard}/>
                </div>
                {Object.entries(userInfo).length !== 0&&<UserInfo userInfo={userInfo}/>}
            </div>
            <HomeMenu onNavigate={handleLink}/>
        </div>
    </>
    )
}