import styles from '../../../cssModule/postContent.module.css';

export default function RP_PostContentBody({content, eventTime}) {
    return (
        <>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                {eventTime&&eventTime.split("-").join(" ")} {eventTime?<br/>:<></>}
                {content}
                </div>
            </div>
        </>
    )
}