import styles from '../../cssModule/plan.module.css';
import cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import exImg from '../../images/exImg.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PlanContent({hostData, eventData}) {
    return (
        <>
            <div className={styles.date}>{eventData.eventTime&&eventData.eventTime.slice(0,10)}</div>
            <div className={styles.planName}>{eventData.title}</div>
            <div className={styles.detailHeader}>이벤트 세부사항</div>
            <div className={styles.detailWrapper}>
                <img src={exImg}/>
                <div className={styles.address}>{eventData.location}</div>
                <div className={styles.tableWrapper}>
                    <div>
                        <span>시간</span>
                        <span>{eventData.eventTime&&eventData.eventTime.slice(11)} </span>
                    </div>
                    <div>
                        <span>주최자 연락처</span>
                        <span>{hostData.phone}</span>
                    </div>
                    <div>
                        <span>인원 수</span>
                        <span>{hostData.currentRecruit}/{hostData.totalRecruit?hostData.totalRecruit:"∞"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}