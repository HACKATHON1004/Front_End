import styles from '../../cssModule/recruitPlacePostWrite.module.css'
import Back from '../../\bcomponents/Button/Back'
import img from '../../images/img.svg'
import { useEffect, useRef, useState } from 'react';
import ImgMenu from '../Post/imgMenu';
import axios from 'axios';
import cookie from 'js-cookie'
import Modal from '../Modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RP_writeInput from '../../\bcomponents/post/recruitPlace/RP_writeInput';

export default function RecruitPlacePostWrite() {
    // const menuRef2 = useRef(); //앨범 버튼 Ref
    const [searchParam] = useSearchParams();
    const modifyPostId = searchParam.get("id");
    // const [selectedImage, setSelectedImage] = useState(null);
    const titleRef = useRef();
    const peopleRef = useRef();
    const contentRef = useRef();
    const timeRef = useRef();
    const dateRef = useRef();
    const checkRef = useRef();
    const phoneRef = useRef();
    const today = new Date().toISOString().slice(0,10);
    const time = new Date().toString().slice(16, 21);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [modifyForm, setModifyForm] = useState({});
    const [modifyDate, setModifyDate] = useState('');
    const [modifyTime, setModifyTime] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchModifyForm = async () => {
            if (modifyPostId) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/${modifyPostId}`);
                    const previousForm = await res.data;
                    setModifyForm(previousForm);
                    titleRef.current.value = previousForm.title;
                    peopleRef.current.value = previousForm.totalRecruit;
                    setAddress(previousForm.location);
                    phoneRef.current.value = previousForm.phone;
                    contentRef.current.value = previousForm.content;
                    setModifyDate(previousForm.eventTime.slice(0, 10));
                    setModifyTime(previousForm.eventTime.slice(11));
                } catch (error) {
                    console.error('Error fetching modify form:', error);
                }
            }
        };

        fetchModifyForm();
    }, []);

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function handleSubmit() {
        const phonePattern = /^\d{10,11}$/;  // Example pattern: 10 or 11 digits
        
        if (!titleRef.current.value || !address || !phoneRef.current.value || !dateRef.current.value || !contentRef.current.value) {
            setShowModal(true);
            return;
        }
        
        // 인원제한 체크 여부 확인
        if (checkRef.current.checked) {
            if (!isNumeric(peopleRef.current.value) || parseInt(peopleRef.current.value) <= 0) {
                setShowModal3(true);
                return;
            }
        }
        
        if (!phonePattern.test(phoneRef.current.value)) {
            setShowModal3(true);
            return;
        }
    
        const postData = {
            title: titleRef.current.value,
            totalRecruit: checkRef.current.checked ? parseInt(peopleRef.current.value) : null, // 인원제한이 체크된 경우 null
            location: address,
            phone: phoneRef.current.value,
            eventTime: `${dateRef.current.value}-${timeRef.current.value}`,
            content: contentRef.current.value,
        };
        
        const headers = {
            Authorization: cookie.get("token"),
        };
        
        if (modifyPostId) {
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/recruit/${modifyPostId}`, postData, { headers })
                .then(res => {
                    setShowModal2(true);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            axios.post(`${import.meta.env.VITE_SERVER_URL}/recruit`, postData, { headers })
                .then(res => {
                    axios.post(`${import.meta.env.VITE_SERVER_URL}/calendar`, {
                        recruitPostId: res.data
                    }, { headers })
                    setShowModal2(true);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
    
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 검색된 도로명 주소를 state에 저장
                setAddress(data.roadAddress);
            },
        }).open();
    };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setSelectedImage(e.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }; //사진 미리보기
    
    function handleCheckboxChange() {
        console.log(checkRef.current.checked);
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
                    <RP_writeInput
                        titleRef={titleRef}
                        peopleRef={peopleRef}
                        timeRef={timeRef}
                        dateRef={dateRef}
                        checkRef={checkRef}
                        phoneRef={phoneRef}
                        address={address}
                        today={today} time={time}
                        modifyPostId={modifyPostId} modifyDate={modifyDate} modifyTime={modifyTime}           
                        handleCheckboxChange={handleCheckboxChange}
                        handleAddressSearch={handleAddressSearch}
                    />
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
            {showModal2&&
                <Modal 
                message="장소모집 게시글이 등록되었습니다."
                onClose={()=>{setShowModal(false); navigate(-1)}}/>
            }
            {showModal3&&
                <Modal 
                message="입력 형식을 지켜주세요."
                onClose={()=>{setShowModal3(false);}}/>
            }
        </>
    )
}