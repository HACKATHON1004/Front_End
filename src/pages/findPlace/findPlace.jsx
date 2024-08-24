import React, { useState } from 'react';
import styles from '../../cssModule/findPlace.module.css';
import Back from '../../components/Button/Back';
import img1 from '../../images/gps.svg';
import FindPlaceBody from '../../components/findPlace/FindPlaceBody';
import PlaceSearch from '../../components/placeReview/PlaceSearch';

export default function FindPlace() {
  const [searchWord, setSearchWord] = useState('');
  
  function handleSearch(searchWord) {
    setSearchWord(searchWord);
  }

  return (
    <>
      <Back />
      <div className={styles.pageWrapper}>
        <div className={styles.title}>
          <div>
            <img src={img1} />
          </div>
          <div>
            <span>지도에서 찾기</span>
          </div>
        </div>
        <PlaceSearch handleSearch={handleSearch}/>
        <FindPlaceBody searchWord={searchWord}/>
      </div>
    </>
  );
}
