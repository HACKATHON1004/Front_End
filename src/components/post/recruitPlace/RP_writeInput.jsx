import { useRef, useState } from "react";
import styles from '../../../cssModule/recruitPlacePostWrite.module.css';

export default function RP_writeInput({ titleRef,address, peopleRef, timeRef, dateRef, checkRef, phoneRef, handleCheckboxChange, handleAddressSearch, today, time, modifyDate, modifyTime, modifyPostId }) {
    
    return (
        <>
            <div className={styles.titleWrapper}>
                <input
                    ref={titleRef}
                    type="text"
                    placeholder="제목을 입력해 주세요."
                    className={styles.inputField}
                />
            </div>
            <div className={styles.checkboxWrapper}>
                <input
                    ref={peopleRef}
                    type="text"
                    placeholder="모집인원을 숫자로 입력해 주세요."
                    className={styles.inputField}
                />
                <div className={styles.checkboxContainer}>
                    <input defaultChecked type="checkbox" id="noLimit" ref={checkRef} onChange={handleCheckboxChange}/>
                    <label className={styles.checkLabel} htmlFor="noLimit">인원제한</label>
                </div>
            </div>
            <div className={styles.imgWrapper}>
                {/* <input
                    ref={addressRef}
                    onClick={handleAddressSearch}
                    type="text"
                    placeholder="모집장소 주소를 입력해 주세요. 🔍"
                    className={styles.inputField}
                /> */}
                <div onClick={handleAddressSearch} className={styles.inputField}>
                    {address?address:"모집장소 주소를 입력해주세요. 🔍"}
                </div>      
            </div>
            {/* <ImgMenu /> */}
            {/* <input
                type="file"
                id="photoUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            /> */}
            <div className={styles.phoneWrapper}>
                <input
                    ref={phoneRef}
                    type="text"
                    placeholder="전화번호를 입력해 주세요."
                    className={styles.inputField}
                />
            </div>
            <div className={styles.selectWrapper}>
                <input ref={dateRef} min={today} type='date' id='date' name='date' defaultValue={modifyPostId?modifyDate:today} />
                <input ref={timeRef} min={time} type="time" id="time" name="time" defaultValue={modifyPostId?modifyTime:time} />
            </div>
        </>
    )
}