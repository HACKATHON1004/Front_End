import { useState, useEffect } from "react";
import cookies from 'js-cookie';
import styles from '../../cssModule/home.module.css';

export default function userInfo({userInfo}) {

    return (
        <>
            {userInfo.career?
                (
                    <div className={styles.tableWrapper2}>
                    <div>
                        <span>나이</span>
                        <span>{userInfo.age}</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>{userInfo.sex==="남성"?"남성":"여성"}</span>
                    </div>
                    <div>
                        <span>PT 자격증</span>
                        <span>{userInfo.normalLicense}</span>
                    </div>
                    <div>
                        <span>지도사 자격증</span>
                        <span>{userInfo.sportsLicense}</span>
                    </div>
                    <div>
                        <span>CPR 자격증</span>
                        <span>{userInfo.cprLicense}</span>
                    </div>
                </div>
                ):
                (<div className={styles.tableWrapper}>
                    <div>
                        <span>ID</span>
                        <span>{userInfo.username}</span>
                    </div>
                    <div>
                        <span>나이</span>
                        <span>{userInfo.age}세</span>
                    </div>
                    <div>
                        <span>성별</span>
                        <span>{userInfo.sex==="남성"?"남성":"여성"}</span>
                    </div>
                    <div>
                        <span>장애분류</span>
                        <span>{userInfo.disabilityCF}</span>
                    </div>
                    <div>
                        <span>선호하는 운동 강도</span>
                        <span>{userInfo.exerciseIntensity}</span>
                    </div>
                </div>)}
        </>
    )
}