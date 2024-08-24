import Back from '../../components/Button/Back';
import styles from '../../cssModule/inquirePostContent.module.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cookie from 'js-cookie'
import axios from "axios";
import Modal3 from "../../components/modals/Modal3";
import Modal from "../../components/modals/Modal";
import write from '../../images/write.svg'
import InquirePost from '../../components/inquire/InquirePost';
import AnswerPost from '../../components/inquire/AnswerPost';

export default function InquirePostContent() {
    const param = useParams();
    const inquireId = param.id;
    const [comment, setComment] = useState({});
    const isCoach = cookie.get("isCoach");
    const token = cookie.get("token");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const menuRef2 = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef2.current && !menuRef2.current.contains(event.target)) {
                setShowModal(false);
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    function modifyComment() {
        navigate(`/inquire/post?id=${inquireId}`)
    }

    function deleteComment() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/coach/${inquireId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{
                setShowModal2(true);
            })
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleDelete(type) {
        if(type=="mod")
            setShowModal2(true);
        else {
            setShowModal(true);
        }
    }
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/coach/${inquireId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then((res=>{
                setComment(res.data);
            }))
    }, [])
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <InquirePost comment={comment} handleDelete={handleDelete} inquireId={inquireId} isCoach={isCoach}/>
                <div className={styles.btnWrapper}>
                    {isCoach&&isCoach==="true"&&comment.isAnswer===false?(<button onClick={()=>navigate(`/inquire/answer?id=${inquireId}`)} className={styles.postBtn}>
                        <img src={write} style={{marginRight:"2px"}} alt="Pencil Icon" width="24" height="24"/>
                        <span>답변하기</span>
                    </button>):(<></>)}
                </div>
                <AnswerPost inquireId={inquireId} handleDelete={handleDelete} token={token} isCoach={isCoach}/>
            </div>
            {showModal && (
                <Modal3
                    onClose={handleCloseModal}
                    onModify={modifyComment}
                    onDelete={deleteComment}
                    showMenu={showModal}
                    menuRef2={menuRef2}
                />
            )}
            {showModal2 && (
                <Modal
                    message="질문이 삭제되었습니다."
                    onClose={()=>navigate(-1)}
                />
            )}
        </>
    )
}