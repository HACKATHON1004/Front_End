import styles from '../../cssModule/home.module.css';

export default function HomeHeader({userInfo}) {
    return (
        <div className={styles.header}>
            <span className={styles.username}>{userInfo&&userInfo.isGuardian?userInfo.nickname:userInfo.name} </span>
                {userInfo&&userInfo.career?<span>코치</span>:(userInfo.isGuardian?<span>보호자</span>:<span className={styles.username}>{userInfo.nickname}</span>)}
            <span>님 환영합니다!</span>
        </div>
    )
}