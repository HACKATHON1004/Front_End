import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from '../../cssModule/findPlace.module.css'
import Back from '../Button/Back';
import img1 from '../../images/gps.svg'
import { useRef } from 'react';
import img2 from '../../images/close.svg'
import img3 from '../../images/search.svg'
import cat from '../../images/grayCat.svg'

export default function FindPlace() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [parkFacilities, setParkFacilities] = useState([]);
  const [healthFacilities, setHealthFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [search, setSearch] = useState('장애인');
  const [search2, setSearch2] = useState('운동');
  const [sortedData, setSortedData] = useState([]);
  console.log(sortedData);

  const handleClear = () => {
    inputRef.current.value='';
  };

  function handleSearch() {
    setSearch(inputRef.current.value);
    setSearch2('라어낸');
  }

  const inputRef = useRef();

  useEffect(() => {
    // 사용자의 현재 위치 정보 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (currentLocation) {
      // 현재 위치 기준으로 공원과 헬스 시설 정보 가져오기
      fetchPlaces(currentLocation);
    }
  }, [currentLocation, search]);

  const fetchPlaces = async (location) => {
    try {
      // 카카오 Local API를 사용하여 공원과 헬스 시설 정보 가져오기
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?x=${location.lng}&y=${location.lat}&radius=5000&query=${search}`,
        {
          headers: {
            Authorization: 'KakaoAK de534ad8a6c23d715eaf602c76382205',
          },
        }
      );
      const data = await response.json();

      const response2 = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?x=${location.lng}&y=${location.lat}&radius=5000&query=${search2}`,
        {
          headers: {
            Authorization: 'KakaoAK de534ad8a6c23d715eaf602c76382205',
          },
        }
      );
      const data2 = await response2.json();

      console.log(data);
      console.log(data2);

      // 공원과 헬스 시설을 구분하여 상태에 저장
      const parks = data.documents;
      const healths = data2.documents;
      const combinedData = [...parks, ...healths];
      const sortedData = combinedData.sort((a, b) => a.distance - b.distance);
      setSortedData(sortedData);
      setParkFacilities(parks);
      setHealthFacilities(healths);
      console.log(parkFacilities);
      console.log(healthFacilities);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleFacilityClick = (facility) => {
    // setSelectedFacility(facility);
    window.location.href = facility.place_url;
  };

  return (
  <>
    <Back/>
    <div className={styles.pageWrapper}>
      <div className={styles.title}>
        <div>
          <img src={img1}/> 
        </div>
        <div>
          <span>지도에서 찾기</span>
        </div>
      </div>
      <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                ref={inputRef}
                className={styles.inputField}
            />
            <img src={img2} onClick={handleClear} className={styles.iconButton}/>
            <img src={img3} onClick={handleSearch} className={styles.iconButton}/>
      </div>
      <div className={styles.map}>
        {currentLocation && (
          <Map
            center={{
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            }}
            level={5}
            style={{
              width: '100%',
              height: '350px',
            }}
          >
            {parkFacilities.map((facility) => (
              <MapMarker
                key={facility.id}
                position={{
                  lat: facility.y,
                  lng: facility.x,
                }}
                onClick={() => handleFacilityClick(facility)}
              >
                {selectedFacility && selectedFacility.id === facility.id && (
                    <div style={{ position: 'relative', backgroundColor: 'white',width:'100px', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', zIndex: 10 }}>
                      {facility.place_name}
                    </div>
                  )}
              </MapMarker> 
            ))}
            {healthFacilities.map((facility) => (
              <MapMarker
                key={facility.id}
                position={{
                  lat: facility.y,
                  lng: facility.x,
                }}
                onClick={() => handleFacilityClick(facility)}
              >
                {selectedFacility && selectedFacility.id === facility.id && (
                    <div style={{ position: 'relative', backgroundColor: 'white', width:'100px', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', zIndex: 10 }}>
                      {facility.place_name}
                    </div>
                  )}
              </MapMarker>
            ))}
            {selectedFacility && (
              <Map
                center={{
                  lat: selectedFacility.y,
                  lng: selectedFacility.x,
                }}
                level={5}
                style={{
                  width: '100%',
                  height: '500px',
                }}
              >
                <MapMarker
                  position={{
                    lat: selectedFacility.y,
                    lng: selectedFacility.x,
                  }}
                />
              </Map>
            )}
          </Map>
        )}
      </div>
      <div className={styles.cardWrapper}>
          {sortedData.map((facility) => (
            <div onClick={()=>handleFacilityClick(facility)} className={styles.card} key={facility.id} >
              <div className={styles.imageSection}>
                <img src={cat} alt="Cat" className={styles.catImage} />
              </div>
              <div className={styles.textSection}>
                <div className={styles.placeTitle}>{facility.place_name}</div>
                <div className={styles.detail}>
                  <div className={styles.subText}>{facility.address_name}</div>
                  <div className={styles.distance}>{(facility.distance*0.001).toFixed(1)}Km</div>
                </div>
              </div>
            </div>
          ))}
          {/* {healthFacilities.map((facility) => (
            <div key={facility.id}>
              {facility.place_name}
            </div>
          ))} */}
        </div>
    </div>
  </>
  );
}
