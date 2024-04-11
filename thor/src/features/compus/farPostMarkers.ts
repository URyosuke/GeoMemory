import { Popup, Marker, Map } from 'mapbox-gl';
import './Compus.css';

export const farPostMarkers = ({ name,postId,lat, lng, content,img,map }: { name:string,postId: number,lng: number, lat: number, content: string,img?:string,map: Map }) => {

    const popUp = new Popup({ closeButton: true, className:"postPopup"})
        .setMaxWidth('400px')
        .setHTML(
            `<div className="caption">
                <h2> You cannot see.</h2>
            </div>`
        )

    new Marker({ color: '#a9a9a9', scale: 1 })
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map)
}