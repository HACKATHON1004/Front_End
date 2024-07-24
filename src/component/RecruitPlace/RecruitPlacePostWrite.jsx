import styles from '../../cssModule/recruitPlacePostWrite.module.css'
import Back from '../Button/Back'
import img from '../../images/img.svg'
import { useRef, useState } from 'react';
import ImgMenu from '../imgMenu';

export default function RecruitPlacePostWrite() {
    const menuRef2 = useRef(); //앨범 버튼 Ref
    const [showMenu, setShowMenu] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const timeRef = useRef();
    const dateRef = useRef();
    const checkRef = useRef();
    const addressRef = useRef();
    const today = new Date().toISOString().slice(0,10);
    const time = new Date().toString().slice(16, 21);
    const [address, setAddress] = useState('');

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 검색된 도로명 주소를 state에 저장
                setAddress(data.roadAddress);

                addressRef.current.value = data.roadAddress;
            },
        }).open();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }; //사진 미리보기
    
    function openMenu() {
        setShowMenu(!showMenu);
    }
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div>
                        <input
                            type="text"
                            placeholder="제목을 입력해 주세요."
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type="text"
                            placeholder="모집인원을 숫자로 입력해 주세요."
                            className={styles.inputField}
                        />
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" id="noLimit" ref={checkRef} />
                            <label htmlFor="noLimit">인원제한 x</label>
                        </div>
                    </div>
                    <div className={styles.imgWrapper}>
                        <input
                            ref={addressRef}
                            onClick={handleAddressSearch}
                            type="text"
                            placeholder="모집장소 주소를 입력해 주세요. 🔍"
                            className={styles.inputField}
                        />
                        <div onClick={openMenu} ref={menuRef2} className={styles.icon}>
                            <img
                                src={img} /* replace with the actual path to your search icon */
                                alt="Search"
                                className={styles.searchIcon}
                            />
                        </div>
                    </div>
                    <ImgMenu showMenu={showMenu} menuRef2={menuRef2} />
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <div>
                        <input
                            type="text"
                            placeholder="전화번호를 입력해 주세요."
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.selectWrapper}>
                        <input ref={dateRef} type='date' id='date' name='date' defaultValue={today} />
                        <input ref={timeRef} type="time" id="time" name="time" defaultValue={time} />
                    </div>
                    <div className={styles.textWrapper}>
                        <textarea placeholder="내용을 입력하세요."/>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.delBtn}>취소</button>
                        <button className={styles.postBtn}>등록</button>
                    </div>
                </div>
            </div>
        </>
    )
}