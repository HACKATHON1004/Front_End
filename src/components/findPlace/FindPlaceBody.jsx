import styles from '../../cssModule/findPlace.module.css';
import { useState, useEffect } from "react";
import FindPlaceMap from "./FindPlaceMap";
import PlaceList from "../placeReview/PlaceList";

export default function FindPlaceBody({selectedFacility, searchWord}) {
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentLocation, setCurrentLocation] = useState(null);
    const [parkFacilities, setParkFacilities] = useState([]);
    const [healthFacilities, setHealthFacilities] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [search, setSearch] = useState('장애인');
    const [search2, setSearch2] = useState('헬스장');
    const [search3, setSearch3] = useState('운동');
    const [search4, setSearch4] = useState('공원');

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

      useEffect(()=>{
        if(searchWord){
            setSearch(searchWord);
            setSearch2('라어낸');
            setSearch3('adfadf');
            setSearch4('a;sdjfa');
        }
      }, [searchWord])
    
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
            <FindPlaceMap 
                loading={loading} 
                parkFacilities={parkFacilities} healthFacilities={healthFacilities} selectedFacility={selectedFacility}
                currentLocation={currentLocation}    
            />    
            <PlaceList sortedData={sortedData} loading={loading}/>
        </>
    )
}