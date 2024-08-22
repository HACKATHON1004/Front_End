import styles from '../../cssModule/placeReview.module.css';
import img2 from '../../images/close.svg';
import img3 from '../../images/search.svg';

export default function PlaceSearch({handleSearch, inputRef}) {
    const handleClear = () => {
    inputRef.current.value = '';
  };
    
    return (
        <>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="장소를 입력해 주세요."
                    ref={inputRef}
                    className={styles.inputField}
                />
                <img src={img2} onClick={handleClear} className={styles.iconButton} />
                <img src={img3} onClick={handleSearch} className={styles.iconButton} />
            </div>
        </>
    )
}