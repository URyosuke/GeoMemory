import { useRef, useEffect, useLayoutEffect } from 'react';
import { AppDispatch } from "../../app/store";
import { UseMap } from './UseMap';
import './Compus.css';
import { useSelector, useDispatch } from "react-redux";
//import 'mapbox-gl/dist/mapbox-gl.css';
import Auth from '../auth/Auth';



function Compus() {
    const dispatch: AppDispatch = useDispatch();
    const mapRef = useRef<HTMLDivElement>(null);
    UseMap(mapRef);
        
    return (
        <>
            <Auth />
            <div ref={mapRef} className='map' />
        </>
        
    )
}

export default Compus




// import { useEffect, useRef ,useState} from 'react';
// import { useMap } from './useMap';
// import { JSX } from 'react/jsx-runtime';
// import './Compus.css'
// import 'mapbox-gl/dist/mapbox-gl.css';


// import * as React from 'react';
// import Map, {
//     Layer,
//     LayerProps,
//     MapProvider,
//     Marker,
//     MarkerDragEvent,
//     NavigationControl,
//     Source,
//   } from "react-map-gl";


//   const MapboxMap: React.FC = () => {
//     const [viewport, setViewport] = useState({
//       width: '100%',
//       height: '400px',
//       latitude: 0, // デフォルトの緯度
//       longitude: 0, // デフォルトの経度
//       zoom: 10,
//     });
  
//     const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  
//     useEffect(() => {
//       // ユーザーの位置情報を取得するロジック
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ latitude, longitude });
//           setViewport((prevViewport) => ({
//             ...prevViewport,
//             latitude,
//             longitude,
//           }));
//         });
//       }
//     }, []);
  
//     return (
//       <Map
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
//         onViewportChange={(newViewport) => setViewport(newViewport)}
//       >
//         <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
//           <div>マーカー</div>
//         </Marker>
//       </Map>
//     );
//   };
  
//   export default MapboxMap;
// // interface LatLng {
// //     lng:number;
// //     lat:number;
// // }

// // const defaultPosition = {lng: 139.7673068, lat: 35.6809591}
// // //let position ={latitude: number,longitude: number;}
// // var preLatitude = 35.6809591;
// // var preLongitude = 139.7673068;



// // const HomeContent = () => {
// //     const getCurrentPosition = (): Promise<{ lat: number, lng: number }> => {
// //         return new Promise<{ lat: number, lng: number }>((resolve, reject) => {
// //           navigator.geolocation.getCurrentPosition(position => {
// //               const {latitude, longitude} = position.coords;
// //               resolve({lat: latitude, lng: longitude})
// //             },
// //             (error) => {
// //               reject(defaultPosition)
// //             },
// //             {enableHighAccuracy: true, timeout: 10000, maximumAge: 0});
// //         })
// //     };
// //     useEffect(() => {
// //         getCurrentPosition().then(setCurrentUserPosition).catch(setCurrentUserPosition)
// //       }, [])

// //     // useEffect(() => {
// //     //     getCurrentPosition()
// //     //     .then((position) => {
// //     //         preLatitude = position.lat;
// //     //         preLongitude = position.lng;
// //     //         console.log('緯度:', preLatitude);
            
// //     //     })
// //     //     .catch((error) => {
// //     //       console.error(error.message);
// //     //     });
// //     // }, []);

// //     const [currentUserPosition, setCurrentUserPosition] = useState<LatLng | null>(null);
    
// //     return (
// //         <div>
// //             {currentUserPosition &&
// //             <map
// //                 id='myMap'
// //                 initialViewState={{
// //                     longitude: currentUserPosition.lng,
// //                     latitude: currentUserPosition.lat,
// //                     zoom: 14,
// //                 }}
// //                 style={{width: '100%', height: '100vh'}}
// //                 mapStyle={"mapbox://styles/mapbox/light-v10"}
// //                 mapboxAccessToken={"pk.eyJ1IjoidGF0c3V5YTE2IiwiYSI6ImNsbmp6M3BrZDAzcWsybHBiazhva2d2c3kifQ.iXw4BsmlHM2UHW0uEgbNaA"}
// //             >
// //             </map>
// //             }
// //         </div>
// //     );
// // }

// // const Compus = () => (
// //     <MapProvider>
// //       <HomeContent/>
// //     </MapProvider>
// //   )
  
// //   export default Compus

// //export default Compus

// // function Compus() {
    
// //     const mapRef = useRef<HTMLDivElement>(null);
// //     useMap(mapRef)
        
// //     return (
// //         <div ref={mapRef} className='map' />
// //     )
// // }

// // export default Compus
// // 