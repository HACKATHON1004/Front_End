import { BallTriangle } from 'react-loader-spinner';
import styles from '../../cssModule/findPlace.module.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function FindPlaceMap({loading, parkFacilities, healthFacilities, selectedFacility, currentLocation}) {
    const handleFacilityClick = (facility) => {
        // setSelectedFacility(facility);
        window.location.href = facility.place_url;
      };

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
                            <div style={{ position: 'relative', backgroundColor: 'white', width: '100px', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', zIndex: 10 }}>
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
                            <div style={{ position: 'relative', backgroundColor: 'white', width: '100px', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', zIndex: 10 }}>
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
        </>
    )
}