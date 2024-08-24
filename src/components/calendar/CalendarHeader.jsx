import styles from '../../cssModule/calendar.module.css';
import left from '../../images/left.svg';
import right from '../../images/right.svg';

export default function CalendarHeader({setCurrentDate, currentDate}) {
    return (
        <>
            <div className={styles.up}>
                <img src={left} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} />
                <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <img src={right} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} />
            </div>
        </>
    )
}