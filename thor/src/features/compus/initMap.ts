import { Map } from 'mapbox-gl';

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {

    const map = new Map({
        container,
        style: 'mapbox://styles/tatsuya16/clnkdbmn5001101rd3alg20p9',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: 'pk.eyJ1IjoidGF0c3V5YTE2IiwiYSI6ImNsbmp6M3BrZDAzcWsybHBiazhva2d2c3kifQ.iXw4BsmlHM2UHW0uEgbNaA',
        doubleClickZoom: false
    });
    return map


}