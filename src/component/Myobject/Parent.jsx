import { useState } from 'react';
import styles from '../cssModule/Parent.module.css';

function Parent() {
    const [isGuardian, setIsGuardian] = useState(null);

    const handleCheckboxChange = (value) => {
        setIsGuardian(value);
    };

    const handleSubmit = async () => {
        const data = { isGuardian: isGuardian };

        try {
            const response = await fetch('http://13.209.239.251:8080/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.Form}>
                <div className={styles.ParentWrapper}>
                    <div className={styles.Parent}>본인은 보호자입니다.</div>
                    <div className={styles.trueandfalse}>
                        <div className={styles.viewWrapper}>
                            <input
                                className={styles.Checkbox}
                                type="checkbox"
                                checked={isGuardian === true}
                                onChange={() => handleCheckboxChange(true)}
                            />
                            <div className={styles.Saw}>네</div>
                        </div>
                        <div className={styles.viewWrapper}>
                            <input
                                className={styles.Checkbox}
                                type="checkbox"
                                checked={isGuardian === false}
                                onChange={() => handleCheckboxChange(false)}
                            />
                            <div className={styles.Saw}>아니요</div>
                        </div>
                    </div>
                </div>
                <div className={styles.Button}>
                    <button className={styles.SubmitButton} onClick={handleSubmit}>등록 완료</button>
                </div>
            </div>
        </div>
    );
}

export default Parent;
