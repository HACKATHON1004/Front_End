import { BallTriangle } from 'react-loader-spinner';
import styles from '../../cssModule/findPlace.module.css';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FindPlaceMap({ loading, sortedData, currentLocation }) {
    const [selectedFacility, setSelectedFacility] = useState(null);

    return (
        <>
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
                        {sortedData.map((facility) => (
                            <MapMarker
                                key={facility.id}
                                position={{
                                    lat: facility.y,
                                    lng: facility.x,
                                }}
                                onClick={() => setSelectedFacility(facility)}
                                // 기본 흰색 말풍선을 비활성화하기 위해 content를 비우거나 사용하지 않음
                            />
                        ))}

                        {selectedFacility && (
                            <CustomOverlayMap
                            position={{
                                lat: selectedFacility.y,
                                lng: selectedFacility.x,
                            }}
                        >
                            <div className={styles.customOverlay}>
                                <Link to={selectedFacility.place_url}>
                                    {selectedFacility.place_name}
                                </Link>
                            </div>
                        </CustomOverlayMap>
                        )}
                    </Map>
                )}
            </div>
        </>
    );
}
