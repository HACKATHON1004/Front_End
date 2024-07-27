import { useNavigate } from 'react-router-dom'
import backBtn from '../../images/Back.svg'

export default function Back() {
    const navigate = useNavigate();
    
    function goBack() {
        navigate(-1);
    }
    
    return (
        <>
            <img onClick={goBack} src={backBtn} style={{display:"block", margin:"20px 0 0 0px"}}/>
        </>
    )
}