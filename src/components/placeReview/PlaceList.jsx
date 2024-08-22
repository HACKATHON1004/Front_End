import styles from '../../cssModule/placeReview.module.css';
import { BallTriangle } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import cat from '../../images/grayCat.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PlaceList({search, search2, search3, search4}) {
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentLocation, setCurrentLocation] = useState(null);
    const [parkFacilities, setParkFacilities] = useState([]);
    const [healthFacilities, setHealthFacilities] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const navigate = useNavigate();

    const handleFacilityClick = (placeName, address) => {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/place`, {
          placeName,
          address,
        })
          .then(res=>{
            navigate(`${res.data}`);
          })
      };

    useEffect(() => {
        // 사용자의 현재 위치 정보 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false); // Set loading to false when location is set
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
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              },
            }
          );
          const data = await response.json();
    
          const response2 = await fetch(
            `https://dapi.kakao.com/v2/local/search/keyword.json?x=${location.lng}&y=${location.lat}&radius=5000&query=${search2}`,
            {
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              },
            }
          );
          const data2 = await response2.json();
    
          const response3 = await fetch(
            `https://dapi.kakao.com/v2/local/search/keyword.json?x=${location.lng}&y=${location.lat}&radius=5000&query=${search3}`,
            {
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              },
            }
          );
          const data3 = await response3.json();
    
          const response4 = await fetch(
            `https://dapi.kakao.com/v2/local/search/keyword.json?x=${location.lng}&y=${location.lat}&radius=5000&query=${search4}`,
            {
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              },
            }
          );
          const data4 = await response4.json();
    
          // 공원과 헬스 시설을 구분하여 상태에 저장
          const parks = data.documents;
          const healths = data2.documents;
          const third = data3.documents;
          const fourth = data4.documents;
          const combinedData = [...parks, ...healths, ...third, ...fourth];
          const sortedData = combinedData.sort((a, b) => a.distance - b.distance);
          const uniqueData = [];
          const seenIds = new Set();
          for (const item of combinedData) {
            // 각 항목이 고유한 'id' 속성을 가지고 있다고 가정합니다.
            if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                uniqueData.push(item);
            }
          }
          setSortedData(uniqueData);
          setParkFacilities(parks);
          setHealthFacilities(healths);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };
    
    return (
        <>
            <div className={styles.bodyWrapper}>
                <div className={styles.map}>
                    {loading ? ( // Display loading indicator
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                    ) : (
                    <div className={styles.cardWrapper}>
                        {sortedData.map((facility) => (
                        <div onClick={() => handleFacilityClick(facility.place_name, facility.address_name)} className={styles.card} key={facility.id} >
                            <div className={styles.imageSection}>
                            <img src={cat} alt="Cat" className={styles.catImage} />
                            </div>
                            <div className={styles.textSection}>
                            <div className={styles.placeTitle}>{facility.place_name}</div>
                            <div className={styles.detail}>
                                <div className={styles.subText}>{facility.address_name}</div>
                                <div className={styles.distance}>{(facility.distance * 0.001).toFixed(1)}Km</div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}