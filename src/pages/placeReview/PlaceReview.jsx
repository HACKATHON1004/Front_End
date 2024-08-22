import React, { useState, useEffect, useRef } from 'react';
import styles from '../../cssModule/placeReview.module.css';
import Back from '../../\bcomponents/Button/Back';
import img1 from '../../images/pencil.svg';
import PlaceSearch from '../../\bcomponents/placeReview/PlaceSearch';
import PlaceList from '../../\bcomponents/placeReview/PlaceList';

export default function PlaceReview() {
  const [search, setSearch] = useState('장애인');
  const [search2, setSearch2] = useState('헬스장');
  const [search3, setSearch3] = useState('운동');
  const [search4, setSearch4] = useState('공원');
  const inputRef = useRef();

  function handleSearch() {
    setSearch(inputRef.current.value);
    setSearch2('라어낸');
    setSearch3('ksjfosk');
    setSearch4('akasjfo');
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
            <span>장소 리뷰</span>
          </div>
        </div>
        <PlaceSearch handleSearch={handleSearch} inputRef={inputRef}/>
        <PlaceList search={search} search2={search2} search3={search3} search4={search4}/>
      </div>
    </>
  );
}