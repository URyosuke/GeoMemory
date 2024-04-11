import { Popup, Marker, Map } from 'mapbox-gl';
import './Compus.css';

export const postMarkers = ({ name,postId,lat, lng, content,img,map }: { name:string,postId: number,lng: number, lat: number, content: string,img?:string,map: Map }) => {

    const popUp = new Popup({ closeButton: true, className:"postPopup"})
        .setMaxWidth('400px')
        .setHTML(
            `<div className="caption">
                <h2> ${name}</h2>
                <img src="${img}" width="200">
                <p className="caption"  >${content}</p>
            </div>`
        )

    new Marker({ color: '#0000ff', scale: 1 })
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map)
}