import Back from '../../components/Button/Back';
import styles from "../../cssModule/plan.module.css"
import Modal2 from "../../components/modals/Modal2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import cookie from 'js-cookie'
import Modal from "../../components/modals/Modal";
import PlanMemo from '../../components/calendar/PlanMemo';
import PlanContent from '../../components/calendar/PlanContent';

export default function Plan() {
    const param = useParams();
    const eventId = param.id;
    const [eventData, setEventData] = useState({});
    const [hostData, setHosData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const memoRef = useRef();
    const navigate = useNavigate();

    function handleDelete() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handlePlanDelete() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventData.id}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{     
                setShowModal(false);
                setShowModal2(true);
            })
    }

    useEffect(() => {
        // 마운트 시 실행되는 코드
        axios.get(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(res=>{
                memoRef.current.value=res.data.content;
                axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/${res.data.recruitPostId}`, {
                    headers: {
                        Authorization: cookie.get("token")
                    }
                })
                    .then(res=>{
                        setHosData(res.data);
                    })
                setEventData(res.data);
            })
    }, []);

    useEffect(() => {
        const handleMemoChange = () => {
            axios.patch(`${import.meta.env.VITE_SERVER_URL}/calendar/${eventId}`, {
                content: memoRef.current.value
            }, {
                headers: {
                    Authorization: cookie.get("token")
                }
            })
            .catch(error => {
                console.error("Error saving memo:", error);
            });
        };

        const textarea = memoRef.current;
        textarea.addEventListener('input', handleMemoChange);

        return () => {
            textarea.removeEventListener('input', handleMemoChange);
        };
    }, []);

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <PlanContent eventData={eventData} hostData={hostData}/>
                <PlanMemo memoRef={memoRef}/>
                <div className={styles.btnWrapper}>
                    <button onClick={handleDelete}>이벤트 삭제</button>
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={handleCloseModal}
                        onCheck={handlePlanDelete}
                    />
                )}
                {showModal2 && (
                    <Modal
                        message="이벤트가 삭제되었습니다."
                        onClose={()=>navigate(-1)}
                    />
                )}
            </div>
        </>
    )
}
