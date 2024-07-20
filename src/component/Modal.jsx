import styles from "../cssModule/modal.module.css"

export default function({message, onClose}) {
    return (
        // <div id="modal" class="modal">
        //     <div class="modal-content">
        //         <p>{message}</p>
        //         <button className="modal-button" onClick={onClose}>확인</button>
        //     </div>
        // </div>

        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>아이디나 비밀번호가 올바르지 않습니다.</p>
            <button className={styles.modalButton} onClick={onClose}>확인</button>
          </div>
        </div>
      );
}