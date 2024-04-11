import { useEffect,useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { initMap } from './initMap';
import { generateNewMarker } from './generateNewMarker';
import { postMarkers} from './postMarkers';
import { farPostMarkers} from './farPostMarkers';
import {selectPosts} from "../post/postSlice";
import { AppDispatch } from "../../app/store";

import {selectProfile} from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncGetPosts, fetchAsyncGetComments } from "../post/postSlice";
import {
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
  } from "./../auth/authSlice";

export const UseMap = (container: React.RefObject<HTMLDivElement>) => {
  const dispatch: AppDispatch = useDispatch();

  function hubeny(lat1:number, lng1:number, lat2:number, lng2:number) {
    function rad(deg:number) {
      return deg * Math.PI / 180;
    }
    // degree to radian
    lat1 = rad(lat1);
    lng1 = rad(lng1);
    lat2 = rad(lat2);
    lng2 = rad(lng2);
  
    // 緯度差
    var latDiff = lat1 - lat2;
    // 経度差算
    var lngDiff = lng1 - lng2;
    // 平均緯度
    var latAvg = (lat1 + lat2) / 2.0;
    // 赤道半径
    var a = 6378137.0;
    // 極半径
    var b = 6356752.314140356;
    // 第一離心率^2
    var e2 = 0.00669438002301188;
    // 赤道上の子午線曲率半径
    var a1e2 = 6335439.32708317;
  
    var sinLat = Math.sin(latAvg);
    var W2 = 1.0 - e2 * (sinLat * sinLat);
  
    // 子午線曲率半径M
    var M = a1e2 / (Math.sqrt(W2) * W2);
    // 卯酉線曲率半径
    var N = a / Math.sqrt(W2);
  
    var t1 = M * latDiff;
    var t2 = N * Math.cos(latAvg) * lngDiff;
    return Math.sqrt((t1 * t1) + (t2 * t2));
  }

  const posts = useSelector(selectPosts);
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
  
  useLayoutEffect(() => {
    const getPost = async () => {
      await dispatch(fetchAsyncGetProfs());
      await dispatch(fetchAsyncGetPosts());
      await dispatch(fetchAsyncGetComments());
      await dispatch(fetchAsyncGetMyProf(Number(localStorage.getItem('userid'))));
      console.log('hello1');
      
    };
    getPost();
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

          //console.log(position.longitude);
          generateNewMarker({lng:position.longitude, lat:position.latitude, map:mapInitRef.current});
          // postMarkers({name:"nameex",postId: 1, lng: 137.1304880, lat: 35.0553090, content: "hggubfhfhfhhehdddhdhddhdhdhdhdhdhhdhdhjjskssjdjdjdjdjdjjddj", map:mapInitRef.current});
          // postMarkers({name:"nameAAA",postId: 2, lng: 136.9812170, lat: 35.1340144, content: "テストテストこれはテストですこれはテストですこれはテストです ", map:mapInitRef.current});

          console.log(posts);    
          const nearPosts = posts.filter((post) => hubeny(position.latitude, position.longitude, post.latitude, post.longitude) <= 10000);
          const farPosts = posts.filter((post) => hubeny(position.latitude, position.longitude, post.latitude, post.longitude) > 10000);
          for(let i = 0; i < nearPosts.length; i++){
            
            postMarkers({name:"name", postId:nearPosts[i].postid, lng:nearPosts[i].longitude, lat:nearPosts[i].latitude, content: nearPosts[i].content, map:mapInitRef.current});
          }
          for(let i = 0; i < farPosts.length; i++){
            
            farPostMarkers({name:"name", postId:farPosts[i].postid, lng:farPosts[i].longitude, lat:farPosts[i].latitude, content: farPosts[i].content, map:mapInitRef.current});
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