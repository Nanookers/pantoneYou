import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserUpload from '../UserUpload/UserUpload'
import InfoPage from '../InfoPage/InfoPage';
import GalleryPageUnlisted from '../InfoPage/GalleryPageUnlisted';


function ConditionalGallery() {
    
    

    return (
        <>
            <UserUpload />
            <InfoPage />      
        </>
    )
    
}

export default ConditionalGallery

