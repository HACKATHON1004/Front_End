import axios from 'axios';
import styles from '../../cssModule/postContent.module.css'
import Back from '../../components/Button/Back';
import Modal from '../Modal';
import Modal2 from '../Modal2';
import Modal3 from '../Modal3';
import CmtModal from '../../components/modals/CmtModalStar';
import Comment from '../../components/post/Comment';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import FP_PC_component from '../../\bcomponents/post/freePost/\bFP_PC_component';
import FP_RecBtns from '../../\bcomponents/post/freePost/FP_RecBtns';

export default function PostContent() {
    const param = useParams();
    const postId = param.id;
    const [username, setUsername] = useState('');
    const [postData, setPostData] = useState([]);
    const [showModal, setShowModal] = useState(false); //삭제
    const [showModal2, setShowModal2] = useState(false); //수정
    const [showModal3, setShowModal3] = useState(false); //댓글 수정 및 삭제
    const [showModal4, setShowModal4] = useState(false); //수정 확인
    const [showModal5, setShowModal5] = useState(false); //삭제 확인
    const [showModal6, setShowModal6] = useState(false);
    const [showModal7, setShowModal7] = useState(false);
    const [commentId, setCommentId] = useState(false);
    const [comments, setComments] = useState([]);
    const menuRef2 = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/fpcomment/freePost/${postId}`)
            .then(res=>{
                setComments(res.data);
            })

        axios.get(`${import.meta.env.VITE_SERVER_URL}/user/username`,{
            headers:{
                Authorization: cookie.get("token")                }
        })
            .then(res=>{
                setUsername(res.data.username);
            })
            .catch(()=>{
                console.log("그딴거 없음");
            })
            
    }, [])

    function handleDelete(type) {
        if(type==="del") 
            setShowModal(true);
        else if(type=="mod")
            setShowModal2(true);
        else {
            setShowModal3(true);
            setCommentId(type);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
        setShowModal2(false);
        setShowModal3(false);
        setShowModal4(false);
        setShowModal5(false);
    }

    function handleModify() {
        navigate(`/freePost/post?id=${postId}`);
    }

    function handleDeletePost() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/free/${postId}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        })
        setShowModal(false);
        setShowModal5(true);
    }

    function modifyComment() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/recommend/${postId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        },{
            recommendType: "-1"
        })
            .then(()=>{
                navigate(0);
            })
    }

    function deleteComment() {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/fpcomment/${commentId}`,{
            headers: {
                Authorization: cookie.get("token")
            }
        })
            .then(()=>{
                
            })
        setShowModal7(true);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef2.current && !menuRef2.current.contains(event.target)) {
                setShowModal3(false);
            }
        }

        if (showModal3) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal3]);

    // const comments = [
    //     {
    //       id: 1,
    //       username: '민머시기',
    //       text: '빨리 급함',
    //       timestamp: '2024.07.16. 20:44',
    //       profilePic: 'https://via.placeholder.com/50'
    //     },
    //     {
    //       id: 2,
    //       username: '홍길동',
    //       text: '민머시기 어디서 하는데?',
    //       timestamp: '2024.07.16. 20:45',
    //       profilePic: 'https://via.placeholder.com/50'
    //     },
    //     {
    //       id: 3,
    //       username: '민머시기',
    //       text: '홍길동 잠실!!',
    //       timestamp: '2024.07.16. 20:46',
    //       profilePic: 'https://via.placeholder.com/50'
    //     }
    //   ];
    
    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <FP_PC_component comments={comments.length} postId={postId}/>
                <FP_RecBtns postId={postId}/>
                {postData.id&&<CmtModal msg="댓글을 남겨보세요." username={username} postId={postId}/>}
                <div className={styles.commentSection}>
                    <div className={styles.commentCnt}>
                        <div className={styles.cnt}>댓글 {comments.length}개</div>
                    </div>
                    {comments.map(comment => (
                    <Comment
                        id={comment.id}
                        handleDelete={handleDelete}
                        key={comment.id}
                        username={comment.username}
                        text={comment.content}
                        timestamp={comment.createDate}
                        profilePic={'https://via.placeholder.com/50'}
                    />
                    ))}
                </div>
                {showModal && (
                    <Modal2
                        message="삭제 하시겠습니까?"
                        onClose={handleCloseModal}
                        onCheck={handleDeletePost}
                    />
                )}
                {showModal2 && (
                    <Modal2
                        message="수정 하시겠습니까?"
                        onClose={handleCloseModal}
                        onCheck={handleModify}
                    />
                )}
                {showModal3 && (
                    <Modal3
                        onClose={handleCloseModal}
                        onModify={modifyComment}
                        onDelete={deleteComment}
                        showMenu={showModal3}
                        menuRef2={menuRef2}
                    />
                )}
                {showModal4 && (
                    <Modal
                        message="게시글이 수정되었습니다."
                        onClose={()=>handleCloseModal("del")}
                    />
                )}
                {showModal5 && (
                    <Modal
                        message="게시글이 삭제되었습니다."
                        onClose={()=>navigate('/freePost')}
                    />
                )}
                {showModal7 && (
                    <Modal
                        message="댓글이 삭제되었습니다."
                        onClose={()=>{navigate(0)}}
                    />
                )}
            </div>
        </>
    )
}