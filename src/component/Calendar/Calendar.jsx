import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Back from '../Button/Back';
import styles from '../../cssModule/calendar.module.css';
import { useEffect } from 'react';
import left from '../../images/left.svg'
import right from '../../images/right.svg'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPlan, setDataPlan] = useState([]);
    const [planDays, setPlanDays] = useState([]);
    const [planMonths, setPlanMonths] = useState([]);
    useEffect(()=>{
        //fetch dataDate

        const dataDate = ["2021-07-14T00:00"]; //axios로 가져온 날짜 배열
        const dataMonths = dataDate.map(date => new Date(date).getMonth()+1);
        const dataDates = dataDate.map(date => new Date(date).getDate());
        setPlanDays(dataDates);
        setPlanMonths(dataMonths);
    }, []);

    console.log(currentDate.getMonth()+1);
    console.log(planDays);
    console.log(planMonths);

    function fetchPlans() {
        //fetch planData

        const dataPlan = [
            {
                startTime: "10:00",
                endTime: "12:00",
                planName: "000 정기모임"
            },
            {
                startTime: "13:00",
                endTime: "15:00",
                planName: "@@@ 정기모임"
            },
            {
                startTime: "17:00",
                endTime: "19:00",
                planName: "000 회식"
            }
        ]

        setDataPlan(dataPlan);
    }

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    // console.log(new Date(planDays[0]).getDate()-1);

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const days = [];

    // 이전 달의 일자를 채움
    const prevMonthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
    ).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push(
            <div className={styles.day + ' ' + styles.otherMonth} key={`prev-${i}`}>
                {prevMonthDays - i}
            </div>
        );
    }

    // 현재 달의 일자를 채움
    for (let i = 1; i <= daysInMonth; i++) {
        const classes = planDays.includes(i)&&planMonths.includes(currentDate.getMonth()+1) ? styles.currentDay : styles.day;
        days.push(
            <div to="/" onClick={fetchPlans} className={classes} key={i}>
                {i}
            </div>
        );
    }

    // 다음 달의 일자를 채움
    const totalDays = days.length;
    for (let i = 1; i <= 42 - totalDays; i++) {
        days.push(
            <div className={styles.day + ' ' + styles.otherMonth} key={`next-${i}`}>
                {i}
            </div>
        );
    }

    return (
        <>
            <Back />
            <div className={styles.pageWrapper}>
                <div className={styles.calendar}>
                    <div className={styles.up}>
                        {/* <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
                            이전 달
                        </button> */}
                        <img src={left} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}/>
                        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        {/* <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
                            다음 달
                        </button> */}
                        <img src={right} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}/>
                    </div>
                    <div className={styles.days}>
                        <div className={styles.dayName}>일</div>
                        <div className={styles.dayName}>월</div>
                        <div className={styles.dayName}>화</div>
                        <div className={styles.dayName}>수</div>
                        <div className={styles.dayName}>목</div>
                        <div className={styles.dayName}>금</div>
                        <div className={styles.dayName}>토</div>
                        {days}
                    </div>
                </div>
                <div className={styles.planList}>
                    {dataPlan.map((data, index)=>{
                        return (
                            <div key={index} className={styles.plan}>
                                <div>
                                    <span>{data.startTime} </span>
                                    <span>~ </span>
                                    <span>{data.endTime}</span>
                                </div>
                                <div>
                                    <span>{data.planName}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
