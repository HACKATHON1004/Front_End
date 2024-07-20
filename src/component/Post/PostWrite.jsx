import Back from "../Button/Back";
import styles from "../../cssModule/postWrite.module.css"
import img from "../../images/img.svg"
import { useState, useEffect } from "react";
import { useRef } from "react";
import ImgMenu from "./imgMenu";

export default function PostWrite() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(); //열린 메뉴 Ref
    const menuRef2 = useRef(); //앨범 버튼 Ref

    function openMenu() {
        setShowMenu(!showMenu);
    }

    function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)
        &&menuRef2.current && !menuRef2.current.contains(e.target)) {
            setShowMenu(false);
            console.log("도작");
        }
      }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Back/>
            <div className={styles.pageWrapper}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <input type="text" placeholder="제목을 입력해 주세요." className={styles.title} />
                    </div>
                    <div onClick={openMenu} ref={menuRef2} className={styles.imgWrapper}>
                        <img src={img}/>
                    </div>
                </div>
                {/* <div className={styles.menuWrapper}>
                    {showMenu&&
                    <div ref={menuRef} className={styles.menu}>
                        <div className={styles.menuItem}>사진 보관함</div>
                        <div className={styles.menuItem}>사진 찍기</div>
                        <div className={styles.menuItem}>파일 선택</div>
                    </div>}
                </div> */}
                <ImgMenu showMenu={showMenu}/>
                <div className={styles.contentWrapper}>
                    <textarea placeholder="내용을 입력하세요."/>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.delBtn}>취소</button>
                    <button className={styles.postBtn}>등록</button>
                </div>
            </div>
        </>
    )
}