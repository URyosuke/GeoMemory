import { Popup, Marker, Map } from 'mapbox-gl';

export const generateNewMarker = ({ lat, lng, map }: { lng: number, lat: number, map: Map }) => {

    const popUp = new Popup({ closeButton: true, anchor: 'left', })
        //.setHTML(`<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`)
        .setHTML(
            `<div>
                <h1>you are here</h1>
            </div>`
        )

    new Marker({ color: '#ff0000', scale: 1 })
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map)
}