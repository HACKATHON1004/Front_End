import styles from '../../cssModule/recruitPlacePostWrite.module.css'
import Back from '../Button/Back'
import img from '../../images/img.svg'
import { useRef, useState } from 'react';
import ImgMenu from '../Post/imgMenu';
import axios from 'axios';
import cookie from 'js-cookie'
import Modal from '../Modal';

export default function RecruitPlacePostWrite() {
    const menuRef2 = useRef(); //앨범 버튼 Ref
    const [showMenu, setShowMenu] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const titleRef = useRef();
    const peopleRef = useRef();
    const contentRef = useRef();
    const timeRef = useRef();
    const dateRef = useRef();
    const checkRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const today = new Date().toISOString().slice(0,10);
    const time = new Date().toString().slice(16, 21);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);

    function handleSubmit() {
        if(!titleRef.current.value||address===''||!phoneRef.current.value||!dateRef.current.value
            ||!contentRef.current.value
        ) {
           setShowModal(true);
           return; 
        }
        if(checkRef.current.value===true){
            if(!peopleRef.current.value){
                setShowModal(true);
                return;
            }
        }

        axios.post("http://13.209.239.251:8080/recruit", {
            title: titleRef.current.value,
            totalRecruit: peopleRef.current.value,
            location: address,
            phone: phoneRef.current.value,
            eventTime: dateRef.current.value+"-"+timeRef.current.value,
            content: contentRef.current.value,
        },{
            headers: {
                Authorization: cookie.get("token")
            }
        })
        .then(res=>{
            console.log(dateRef.current.value+"-"+timeRef.current.value);
        })
        .catch(err=>{
            console.error(err);
        })
    }

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
    
    function handleCheckboxChange() {
        if (!checkRef.current.checked) {
            peopleRef.current.value = '';  // Clear the input
            peopleRef.current.disabled = true;  // Disable the input
        } else {
            peopleRef.current.disabled = false;  // Enable the input
        }
    }
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
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
                        <input
                            ref={addressRef}
                            onClick={handleAddressSearch}
                            type="text"
                            placeholder="모집장소 주소를 입력해 주세요. 🔍"
                            className={styles.inputField}
                        />
                        <div onClick={() => document.getElementById('photoUpload').click()} ref={menuRef2} className={styles.icon}>
                            <img
                                src={img} /* replace with the actual path to your search icon */
                                alt="Search"
                                className={styles.searchIcon}
                            />
                        </div>
                    </div>
                    <ImgMenu />
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <div className={styles.phoneWrapper}>
                        <input
                            ref={phoneRef}
                            type="text"
                            placeholder="전화번호를 입력해 주세요."
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.selectWrapper}>
                        <input ref={dateRef} min={today} type='date' id='date' name='date' defaultValue={today} />
                        <input ref={timeRef} min={time} type="time" id="time" name="time" defaultValue={time} />
                    </div>
                    <div className={styles.textWrapper}>
                        <textarea ref={contentRef} placeholder="내용을 입력하세요."/>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.delBtn}>취소</button>
                        <button onClick={handleSubmit} className={styles.postBtn}>등록</button>
                    </div>
                </div>
            </div>
            {showModal&&
                <Modal 
                message="빈 입력창이 있습니다."
                onClose={()=>{setShowModal(false);}}/>
            }
        </>
    )
}