import React from 'react'
import { useRef } from 'react';
import { useMap } from './profileUseMap';
import './Profile.css';
import Auth from '../auth/Auth';

function Profile() {
  const mapRef = useRef<HTMLDivElement>(null);
    useMap(mapRef)
        
    return (
      <>
        <Auth />
        <div>
          <div ref={mapRef} className='promap' />
        </div>
      </>
      
    )
}

export default Profile