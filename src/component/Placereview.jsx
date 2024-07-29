import React, { useState, useEffect, useRef } from 'react';
import styles from '../cssModule/Placereview.module.css';
import searchIcon from "../images/search.svg";

const Placereview = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // 컴포넌트가 마운트될 때 데이터를 백엔드에서 가져옴
  useEffect(() => {
    fetch('/api/places') // 실제 API 엔드포인트로 교체하세요
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error('데이터 가져오기 오류:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.placeWrapper}>
          <div className={styles.placeReview}>장소 리뷰</div>
          <div className={styles.placeSearch}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
                placeholder="장소를 검색하세요"
                ref={searchInputRef}
              />
              <span className={styles.searchIcon} onClick={handleIconClick}>
                <img src={searchIcon} alt="Search" />
              </span>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.close}>근거리순</button>
            <button className={styles.review}>리뷰 순</button>
          </div>
        </div>
        <div className={styles.placeList}>
          {filteredPlaces.map((place, index) => (
            <div key={index} className={styles.placeItem}>
              <img src={place.image} alt={place.name} className={styles.placeImage} />
              <div className={styles.placeDetails}>
                <div className={styles.placeName}>{place.name}</div>
                <div className={styles.placeRating}>⭐ {place.rating}</div>
                <div className={styles.placeReviews}>{place.reviews} 방문자리뷰</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placereview;
