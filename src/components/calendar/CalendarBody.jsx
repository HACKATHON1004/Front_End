import styles from '../../cssModule/calendar.module.css';
import cookie from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CalendarBody({currentDate, setDataPlan}) {
    const [planDates, setPlanDates] = useState([]);
    const [dataDate, setDataDate] = useState([]);

    useEffect(() => {
        // Fetch dataDate
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar`, {
            headers: { 
                Authorization: cookie.get("token")
            }
        })
        .then((res) => {
            const dates = res.data.map(item => item.slice(0, 10));
            setDataDate(dates);
        })
        .catch(error => {
            console.error("Error fetching calendar data", error);
        });
    }, []);

    useEffect(() => {
        const parsedDates = dataDate.map(date => new Date(date));
        setPlanDates(parsedDates);
    }, [dataDate]);

    function isHilighted(day) {
        return planDates.some(planDate => 
            planDate.getFullYear() === currentDate.getFullYear() &&
            planDate.getMonth() === currentDate.getMonth() &&
            planDate.getDate() === day
        );
    }

    function fetchPlans(day) {
        const parsedDay = day>=10 ? day : '0'+day;
        const month = (currentDate.getMonth()+1)>=10 ? currentDate.getMonth()+1 : "0"+(currentDate.getMonth()+1);
        const date = currentDate.getFullYear().toString()+"-"+month+"-"+parsedDay;
        
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/eventTime/${date}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then((res)=>{
                setDataPlan(res.data);
            })
    }

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

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
        const classes = isHilighted(i) ? styles.currentDay : styles.day;
        days.push(
            <div to="/" onClick={()=>fetchPlans(i)} className={classes} key={i}>
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
        </>
    )
}