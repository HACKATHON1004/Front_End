import { useEffect, useState } from "react";
import RP_PostContentBody from "./RP_PostContentBody";
import RP_PostContentHeader from "./RP_PostContentHeader";
import axios from "axios";

export default function RP_PC_component({comments, username, postId}) {
    const [postData, setPostData] = useState([]);
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/recruit/${postId}`)
            .then(res=>{
                setPostData(res.data);
            })
            .catch(err=>{
                console.error(err);
            });
    }, []);
    
    return (
        <>
            <RP_PostContentHeader
                postData={postData} username={username}
                comments={comments}
            />
            <RP_PostContentBody eventTime={postData.eventTime} content={postData.content}/>
        </>
    )
}