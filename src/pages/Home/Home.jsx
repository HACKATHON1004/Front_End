import styles from '../../cssModule/home.module.css'
import userCard from '../../images/user.svg'
import axios from "axios"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserInfo from '../../components/home/UserInfo'
import cookies from 'js-cookie'
import HomeHeader from '../../components/home/HomeHeader'
import HomeMenu from '../../components/home/HomeMenu'

export default function Home() {
    // const isGuardian = axios.get("");
    const isGuardian = false;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{ //접속 유저가 코치인지 일반 유저인지 확인
        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/isCoach`,null,{
            headers: {
                Authorization: cookies.get("token")
            }
        })
            .then((res)=>{
                if(res.data===true){ //코치라면 userInfo에 코치 정보 set
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
                else { //그렇지 않다면 userInfo에 일반 유저 정보 set
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