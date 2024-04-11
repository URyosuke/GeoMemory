import { useEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { initMap } from '../compus/initMap';
import { generateNewMarker } from '../compus/generateNewMarker';
import { postMarkers} from '../compus/postMarkers';
//import { farPostMarkers} from './farPostMarkers';
import {selectPosts} from "../post/postSlice";

import {selectProfile} from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const posts = useSelector(selectPosts);
  console.log(posts);
  const profiles = useSelector(selectProfile);
  interface UserPosition {
    latitude: number;
    longitude: number;
  }

  async function getCurrentLocation(): Promise<UserPosition> {
        return new Promise<UserPosition>((resolve, reject) => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              },
              (error) => {
                reject(new Error(`位置情報の取得に失敗しました: ${error.message}`));
              }
            );
          } else {
            reject(new Error('ブラウザが位置情報をサポートしていません'));
          }
        });
      }

  const mapInitRef = useRef<Map | null>(null);
  
  useEffect(() => {

    
          getCurrentLocation()
            .then((position) => {
              //console.log('緯度:', position.latitude);
              //console.log('経度:', position.longitude);
              //precoords = [position.longitude,position.latitude];
              if (container.current) {
                mapInitRef.current = initMap(
                    container.current,
                    [position.longitude,position.latitude]
                    //[137.1328814,35.0551522]
                );

                console.log(position.longitude);
                generateNewMarker({lng:position.longitude, lat:position.latitude, map:mapInitRef.current});
                // postMarkers({name:"nameex",postId: 1, lng: 137.1304880, lat: 35.0553090, content: "hggubfhfhfhhehdddhdhddhdhdhdhdhdhhdhdhjjskssjdjdjdjdjdjjddj", map:mapInitRef.current});
                // postMarkers({name:"nameAAA",postId: 2, lng: 136.9812170, lat: 35.1340144, content: "テストテストこれはテストですこれはテストですこれはテストです ", map:mapInitRef.current});

                //const myPosts = posts.filter((post) => post.userid === Number(localStorage.getItem('userid')));
                const myPosts = posts.filter((post) => post.userid === Number(localStorage.getItem('userid')));

                console.log(myPosts);
                //const farPosts = posts.filter((post) => hubeny(position.latitude, position.longitude, post.latitude, post.longitude) > 10000);
                for(let i = 0; i < myPosts.length; i++){
                  
                  postMarkers({name:"name", postId:myPosts[i].postid, lng:myPosts[i].longitude, lat:myPosts[i].latitude, content: myPosts[i].content, map:mapInitRef.current});
                }
                // posts.map((post) => postMarkers({name:"name", postId:post.postid, lng:post.longitude, lat:post.latitude, content: post.content, map:mapInitRef.current}));
                //generateNewMarker({lng:137.1328814,lat:35.0551522,map:mapInitRef.current});
              }
              //console.log(precoords);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }, []);

  // useEffect(() => {
  //   postMarkers({postId: 1, lng: 137.1304880, lat: 35.0553090, content: "hggub", map:mapInitRef.current});

  // }, []);

  // useEffect(() => {
  //     if (container.current) {

  //         mapInitRef.current = initMap(
  //             container.current,
  //             [-100.31019063199852, 25.66901932031443]
  //         );

  //     }
  // }, []);



  useEffect(() => {
      mapInitRef.current && mapInitRef.current.on('dblclick', ({ lngLat }) => generateNewMarker({ map: mapInitRef.current!, ...lngLat }))

      return () => { mapInitRef.current?.off('dblclick', generateNewMarker) }
  }, [])

  
  useEffect(() => {
      mapInitRef.current && mapInitRef.current.on('load', () => generateNewMarker({ map: mapInitRef.current!, ...mapInitRef.current!.getCenter() }))

      return () => { mapInitRef.current?.off('load', generateNewMarker) }
  }, [])
}

// interface UserPosition {
//     latitude: number;
//     longitude: number;
// }
// //let precoords: [number, number];

// async function getCurrentLocation(): Promise<UserPosition> {
//     return new Promise<UserPosition>((resolve, reject) => {
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             resolve({ latitude, longitude });
//           },
//           (error) => {
//             reject(new Error(`位置情報の取得に失敗しました: ${error.message}`));
//           }
//         );
//       } else {
//         reject(new Error('ブラウザが位置情報をサポートしていません'));
//       }
//     });
// }
// // getCurrentLocation()
// //   .then((position) => {
// //     //console.log('緯度:', position.latitude);
// //     //console.log('経度:', position.longitude);
// //     precoords = [position.longitude,position.latitude,];
// //     //console.log(precoords);
// //   })
// //   .catch((error) => {
// //     console.error(error.message);
// //   });

// export const useMap = (container: React.RefObject<HTMLDivElement>) => {
//     //console.log(coords);

//     const mapInitRef = useRef<Map | null>(null);

//     useEffect(() => {

//       getCurrentLocation()
//         .then((position) => {
//           //console.log('緯度:', position.latitude);
//           //console.log('経度:', position.longitude);
//           //precoords = [position.longitude,position.latitude];
//           if (container.current) {
//             mapInitRef.current = initMap(
//                 container.current,
//                 [position.longitude,position.latitude]
//                 //[137.1328814,35.0551522]
//             );

//             //generateNewMarker({lng:position.longitude,lat:position.latitude,map:mapInitRef.current});
//             generateNewMarker({lng:137.1328814,lat:35.0551522,map:mapInitRef.current});
//           }
//           //console.log(precoords);
//         })
//         .catch((error) => {
//           console.error(error.message);
//         });
//     }, []);

// }