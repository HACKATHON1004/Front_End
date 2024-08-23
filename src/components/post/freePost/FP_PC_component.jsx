import { useEffect, useState } from "react";
import PostContentBody from "../recruitPlace/RP_PostContentBody";
import axios from "axios";
import FP_PostContentHeader from "./FP_PostContentHeader";

export default function FP_PC_component({comments, postId}) {
    const [postData, setPostData] = useState([]);
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/free/${postId}`)
            .then(res=>{
                setPostData(res.data);
            })
            .catch(err=>{
                console.error(err);
            });
    }, [])
    
    return (
        <>
            <FP_PostContentHeader 
                postData={postData}
                comments={comments}
                username={postData.username}
            />
            <PostContentBody content={postData.content}/>
        </>
    )
}