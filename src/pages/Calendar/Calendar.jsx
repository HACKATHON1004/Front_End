import React, { useState } from 'react';
import Back from '../../components/Button/Back';
import styles from '../../cssModule/calendar.module.css';
import PlanList from '../../components/calendar/PlanList';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPlan, setDataPlan] = useState([]);

    return (
        <>
            <Back />
            <div className={styles.pageWrapper}>
                <div className={styles.calendar}>
                    <CalendarHeader setCurrentDate={setCurrentDate} currentDate={currentDate} />
                    <CalendarBody currentDate={currentDate} setDataPlan={setDataPlan}/>
                </div>
                <PlanList dataPlan={dataPlan}/>
            </div>
        </>
    );
}
