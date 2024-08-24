import styles from '../../cssModule/plan.module.css';

export default function PlanMemo({memoRef}) {
    return (
        <>
            <div className={styles.memoWrapper}>
                <div className={styles.labelWrapper}>
                    <span>메모</span>
                </div>
                <div className={styles.memo}>
                    <textarea ref={memoRef}/>
                </div>
            </div>
        </>
    )
}