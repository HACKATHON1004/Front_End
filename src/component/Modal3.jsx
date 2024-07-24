import styles from '../cssModule/modal3.module.css'

export default function Modal3({onClose}) {
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.btnWrapper}>
                        <button className={styles.modalButton} onClick={onClose}>수정하기</button>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.modalButton} onClick={onClose}>삭제하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}