import { useNavigate } from 'react-router-dom';
import styles from '../../cssModule/calendar.module.css';

export default function PlanList({dataPlan}) {
    const navigate = useNavigate();
    
    return (
        <>
            <div className={styles.planList}>
                {dataPlan.map((data, index) => (
                    <div onClick={()=>navigate(`/calendar/plan/${data.id}`)} key={index} className={styles.plan}>
                        <div>
                            <span>{data.eventTime.slice(11)} </span>
                        </div>
                        <div>
                            <span>{data.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}