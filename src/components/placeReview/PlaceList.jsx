import styles from '../../cssModule/placeReview.module.css';
import { BallTriangle } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import cat from '../../images/grayCat.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PlaceList({sortedData, loading}) {
  const navigate = useNavigate();
  
  const handleFacilityClick = (placeName, address) => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/place`, {
      placeName,
      address,
    })
      .then(res=>{
        navigate(`/placeReview/${res.data}`);
      })
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